import React from 'react';
import { Link } from 'react-router-dom';

class FeedsIndexRow extends React.Component {
  state = Object.assign({ renaming: false, isMouseInside: false },
                        {subscription_title: this.props.feed.subscription_title});

  handleEdit = (e) => {
    e.preventDefault();
    const newFeed = Object.assign({}, this.props.feed, this.state.subscription_title);
    this.props.updateFeed(newFeed);
    this.state.renaming = false;
  }

  handleEditChange = (e) => {
    this.setState({
      subscription_title: e.target.value
    });
  }

  handleDelete = (e) => {
    this.props.deleteFeed(this.props.feed);
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
        <img src={feed.favicon_url} className="feed-index-icon"/>

        <SubscriptionTitleInput
          rename={() => this.setState({renaming: true})}
          handleEdit={this.handleEdit}
          handleEditChange={this.handleEditChange}
          feed={feed}
          {...this.state}
          />

      </td>
      <td className="feed-status-text">{feed.status}</td>
      <td className="feed-delete-cell">
        { this.state.isMouseInside ?
          <div>
            <button className="modify-button feed-delete"
              onClick={this.handleDelete}>
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

function SubscriptionTitleInput({
  rename, handleEdit,
  handleEditChange, feed,
  isMouseInside, renaming,
  subscription_title,
  ...otherProps
  }) {

  return (
    renaming ?
      <form className="feed-rename-form" onSubmit={handleEdit}>
        <input type="text"
          value={subscription_title}
          onChange={handleEditChange}
          />
        <button><i className="fa fa-check" aria-hidden="true"></i></button>
      </form>
    :
    <div className="feed-name-show">
      <Link to={`/i/subscriptions/${feed.id}`}>{feed.title}</Link>
        { isMouseInside ?
          <button className="modify-button feed-rename"
            onClick={rename}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          : null
        }
    </div>
  );
}

export default FeedsIndexRow;
