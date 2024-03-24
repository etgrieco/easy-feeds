FROM ruby:2.7.8

WORKDIR /app

# Installs node for asset pipeline
RUN apt-get update \
  && apt-get install -y nodejs

RUN gem install bundler -v 2.4.22
COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000" ]