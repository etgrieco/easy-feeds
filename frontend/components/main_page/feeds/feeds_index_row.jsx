import React from 'react';
import SubscriptionStoriesContainer from '../stories/subscription_stories_container';

class FeedsIndexRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({ renaming: false, isMouseInside: false }, this.props.feed);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEdit() {
    return e => {
      e.preventDefault();
      this.props.updateFeed(this.state);
      this.state.renaming = false;
    };
  }

  handleEditChange(e) {
    this.setState({subscription_title: e.target.value});
  }

  handleClick(feed) {
    this.props.openPopOut(
      <SubscriptionStoriesContainer
        feeds={{ [feed.id]: feed }}
        popOutFeedId={feed.id}
      />
    );
  }

  handleDelete(feed) {
    return e => this.props.deleteFeed(feed);
  }

  subscriptionTitleForm(feed) {
    return (
      this.state.renaming ?
        <form className="feed-rename-form"
          onSubmit={this.handleEdit()}>
          <input type="text"
            value={this.state.subscription_title}
            onChange={e => this.handleEditChange(e)}
            />
          <button><i className="fa fa-check" aria-hidden="true"></i></button>
        </form>
      :
      <div className="feed-name-show">
        <h3 onClick={this.handleClick(feed)}>
          {this.state.subscription_title}</h3>
        { this.state.isMouseInside ?
          <button className="modify-button feed-rename"
            onClick={e => this.setState(
              { renaming: true }
            )}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          : null
        }
      </div>
    );
  }

  render() {
    const { feed } = this.props;
    return (
      <tr className="feed-index-row"
        onMouseEnter={e => {
          this.setState({ isMouseInside: true });
          }
        }
        onMouseLeave={e => {
          this.setState({ isMouseInside: false });
          }
        }
      >
      <td className="feed-source-name">
        <img src={feed.image_url} className="feed-index-icon"/>
        {this.subscriptionTitleForm(feed)}
      </td>
      <td className="feed-status-text">{feed.status}</td>
      <td className="feed-delete-cell">
        { this.state.isMouseInside ?
          <div>
            <button className="modify-button feed-delete"
              onClick={this.handleDelete(feed)}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
          : <div className="modify-button feed-delete"></div>
        }
      </td>
      </tr>
    );
  }
}

export default FeedsIndexRow;
