# by Matt Harzewski
# Read more: http://www.webmaster-source.com/2013/09/25/finding-a-websites-favicon-with-ruby/

require "httparty"
require "nokogiri"
require "base64"


class Favicon

  attr_reader :host
	attr_reader :uri
	attr_reader :base64


	def initialize(host)
		@host = host
		check_for_ico_file
		check_for_html_tag
	end


	# Check /favicon.ico
	def check_for_ico_file
		uri = URI::HTTP.build({:host => @host, :path => '/favicon.ico'}).to_s
		res = HTTParty.get(uri)
		if res.code == 200
			@base64 = Base64.encode64(res.body)
			@uri = uri
		end
	end


	# Check "shortcut icon" tag
	def check_for_html_tag
		uri = URI::HTTP.build({:host => @host, :path => '/'}).to_s
		res = HTTParty.get(uri)
		doc = Nokogiri::HTML(res)
		doc.xpath('//link[@rel="shortcut icon"]').each do |tag|
			taguri = URI(tag['href'])
			unless taguri.host.to_s.length < 1
				iconuri = taguri.to_s
			else
				iconuri = URI.join(uri, taguri).to_s
			end
			res = HTTParty.get(iconuri)
			if res.code == 200
				@base64 = Base64.encode64(res.body)
				@uri = iconuri
			end
		end
	end

end
