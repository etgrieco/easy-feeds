import React from 'react';
import { Link } from 'react-router-dom';

class FeedsIndexRow extends React.Component {
  state = Object.assign({ renaming: false, isMouseInside: false }, this.props.feed);

  handleEdit = (e) => {
    e.preventDefault();
    this.props.updateFeed(this.state);
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

  subscriptionTitleForm(feed) {
    return (
      this.state.renaming ?
        <form className="feed-rename-form"
          onSubmit={this.handleEdit}>
          <input type="text"
            value={this.state.subscription_title}
            onChange={this.handleEditChange}
            />
          <button><i className="fa fa-check" aria-hidden="true"></i></button>
        </form>
      :
      <div className="feed-name-show">
        <Link to={`/i/subscriptions/${feed.id}`}>{this.state.subscription_title}</Link>
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
        <img src={feed.favicon_url} className="feed-index-icon"/>
        {this.subscriptionTitleForm(feed)}
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

export default FeedsIndexRow;
