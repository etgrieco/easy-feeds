require 'bcrypt'

class User < ApplicationRecord
  validates :email, :first_name, :password_digest, :session_token,
    presence: true

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :email, uniqueness: true

  attr_reader :password

  after_initialize :ensure_session_token

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
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= create_session_token
  end

  private

  def create_session_token
    SecureRandom.urlsafe_base64(16)
  end

end
