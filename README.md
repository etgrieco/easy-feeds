# EasyFeeds

Live Site Link: [EasyFeeds](http://www.easyfeeds.xyz)

This project is a [Feedly](http://feedly.com)-inspired web app for RSS feed aggregation. With Easy Feeds, you can add RSS Feeds to a personal library of websites in order to stay up-to-date with your favorite online content.

This project uses the Rails framework for the backend API, and a React/Redux framework in order to handle dynamic front-end rendering in a single-page app.

## Features

### Responsive UI

The webpage allows for higher accessibility with responsive UI design for story and feed views. With DRY code, the viewing experience is optimized for both desktop and mobile viewing, as well as compatibility with small window sizes for a more compact viewing experience for multi-taskers.

![Responsive UI Combined][responsive-ui-combined]

In addition to using media queries for applying contingent CSS styling, some vanilla JS functions were integrated with the React components in order to handle the resizing of more dynamic components, such as the navigation bar on the left. It was important to ensure that the navigation bar would handle predictably as the window resized. For example, an open navigation bar in a compact view should remain open as the window view expands. On the other hand, as a window contracts the navigation bar should automatically close.

```jsx
class NavBar extends React.Component {
  state = {
    isOpen: true,
    isManuallyClosed: false,
    isManuallyOpen: false
  };

  handleResize = () => {
    if (window.innerWidth < 700 && !this.state.isManuallyOpen) {
      this.setState({isOpen: false})
    } else if (!this.state.isManuallyClosed) {
      this.setState({isOpen: true})
    }

    if (window.innerWidth > 700) {
      this.setState({isManuallyOpen: false});
    }
  }

  componentDidMount() {
    this.handleResize();
    addEventListener('resize', this.handleResize, false);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <section className={`navbar ${isOpen ? "" : "collapsed"}`}>
        //...
      </section>
    );
  }

}

```


### Smart Feed Fetching

With EasyFeeds, not only are you able to browse the library of feeds provided by the app, but also users can provide their own feeds with a feed URL.

![Add Feed URL][add-feed-url]

This meant that adding new subscriptions had to consider 1) whether a feed was already in the database and 2) if it's not in the database, to quickly check the validity of the feed, parse its basic information, and add it to the user's subscriptions.

Therefore, in the subscriptions creation controller action, I would have to ensure feed properties before adding a subscription. This allows for the proper rendering of errors for invalid URLs, skipping a feed fetch from occurring if the feed URL already exists in the database:
```Ruby
class Api::SubscriptionsController < ApplicationController
  before_action :ensure_feed, only: [:create]

# ...

  def ensure_feed
    @feed = Feed.find_by(rss_url: subscription_params[:rss_url])

    if @feed.nil?
      @feed = Feed.new(rss_url: subscription_params[:rss_url], title: "New Feed")
      unless @feed.save
        # this will stop subscribe create action from occurring
        render json: @feed.errors.full_messages, status: 422
      end
    end
  end

end
```

Another important optimization made was to only fetch the metadata of stories that were not already in the database. This required a checking procedure before story entries were populated for a particular feed:

```Ruby
class Feed < ApplicationRecord
# ...
  def populate_entries
    #fetch entries...
    entries.each do |entry|
      unless stories.find_by(entry_id: entry.entry_id) # looks for potential duplicate
        attributes = Story.create_attributes_hash(entry, self.id, self.title)
        Story.create(attributes)
      end
    end
  end

end
```
### Modular Article and Feed Modals

An important front-end feature is the ability to view content in a modal-like component that comes over the feeds/stories browsing UI. In order to keep the code as DRY as possible, the same front-end popout component was used for both browsing a feed and viewing a specific story.


![Pop Out Modal][pop-out-modal]

This was primarily accomplished by turning the pop out React component into a higher-order component that can accept a component as props:

```jsx
//Skeleton implementation for a 'StoriesShow' component being rendered by a 'PopOut' component

import React from 'react';
import StoriesShow from './story_show';

const PopOut = { handleClose, ...otherProps } => (
  <div className="pop-out-window">
    //...
    <Component />
  </div>
);

export default props => (
  <PopOut {...props} {component: StoriesShow} />;
);
```

## Acknowledgements

In addition to the Rails and React frameworks, this app would not be possible without the collaborators who worked on [Feedjira](https://github.com/feedjira/feedjira) and [MetaInspector](https://github.com/jaimeiniesta/metainspector). These gems were used for efficient and reliable fetching and parsing of RSS files and scraping website metadata.

Other helpful packages used in this project include:
* [Moment.js](https://github.com/moment/moment): Time parsing, formatting, and calculations
* [Ruby Favicon class](https://www.webmaster-source.com/2013/09/25/finding-a-websites-favicon-with-ruby/)


[add-feed-url]: https://raw.githubusercontent.com/etgrieco/EasyFeeds/master/docs/readme-images/add-new-feed.gif
[pop-out-modal]:
https://raw.githubusercontent.com/etgrieco/EasyFeeds/master/docs/readme-images/pop-out-modal.gif

[responsive-ui-desktop]:
https://raw.githubusercontent.com/etgrieco/EasyFeeds/master/docs/readme-images/responsive-ui-desktop.gif

[responsive-ui-mobile]:
https://raw.githubusercontent.com/etgrieco/EasyFeeds/master/docs/readme-images/responsive-ui-mobile.gif

[responsive-ui-combined]:
https://raw.githubusercontent.com/etgrieco/EasyFeeds/master/docs/readme-images/responsive-ui-combined.gif
