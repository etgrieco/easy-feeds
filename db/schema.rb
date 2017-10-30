# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171030154426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "feeds", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.string "rss_url", null: false
    t.string "description", default: "", null: false
    t.string "favicon_url", default: "", null: false
    t.string "image_url", default: "", null: false
    t.string "website_url", default: "", null: false
    t.datetime "last_built", default: "2017-10-26 14:07:05", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "OK"
    t.integer "subscriptions_count", default: 0
    t.index ["rss_url"], name: "index_feeds_on_rss_url", unique: true
    t.index ["title"], name: "index_feeds_on_title"
  end

  create_table "stories", force: :cascade do |t|
    t.string "entry_id"
    t.string "title"
    t.string "author"
    t.string "summary"
    t.string "link_url"
    t.string "image_url"
    t.integer "feed_id", null: false
    t.datetime "pub_datetime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_stories_on_entry_id", unique: true
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer "subscriber_id", null: false
    t.integer "feed_id", null: false
    t.string "title", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subscriber_id", "feed_id"], name: "index_subscriptions_on_subscriber_id_and_feed_id", unique: true
    t.index ["title"], name: "index_subscriptions_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
