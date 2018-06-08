require 'bcrypt'

class User < ApplicationRecord
  attr_accessor :give_seeds

  validates :email, :first_name, :password_digest, :session_token,
            presence: true

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :email, uniqueness: true

  after_initialize :ensure_session_token

  before_create :ensure_seed_default
  after_create_commit :seed_user, if: @give_seeds

  has_many  :subscriptions,
            foreign_key: :subscriber_id,
            dependent: :destroy

  has_many  :feeds,
            through: :subscriptions,
            source: :feed

  has_many  :stories,
            through: :feeds,
            source: :stories

  has_many  :collections,
            foreign_key: :creator_id,
            class_name: :Collection

  has_many  :reads,
            foreign_key: :reader_id,
            class_name: :Read,
            dependent: :destroy

  has_many  :read_stories,
            through: :reads,
            source: :story

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  def reset_session_token!
    self.session_token = create_session_token
    save!
    session_token
  end

  # after_initialize
  def ensure_session_token
    self.session_token ||= create_session_token
  end

  # before_create
  def ensure_seed_default
    @give_seeds ||= true
  end

  # after_create_commit if option not disabled
  def seed_user
    seed_urls = [
      "https://feeds.thedailybeast.com/summary/rss/articles",
      "https://www.wired.com/feed/rss",
      "https://www.polygon.com/rss/index.xml",
      "http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml",
      "https://blog.github.com/blog.atom",
      "https://www.theringer.com/rss/index.xml"
    ]

    seed_urls.each do |url|
      feed = Feed.find_by(rss_url: url)
      next if feed.nil?
      s = Subscription.new(
        subscriber_id: id,
        feed_id: feed.id
      )
      s.save
    end
  end

  def subscription_by_feed(feed_id)
    subscriptions.find_by(feed_id: feed_id)
  end

  private

  def create_session_token
    SecureRandom.urlsafe_base64(16)
  end

  attr_reader :password
end
