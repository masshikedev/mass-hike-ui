import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadableComponent from '../components/LoadableComponent';
import MemberGrid from '../components/admin/members/MemberGrid';
import { adminGetAllMembers } from '../actions/MemberActions';
import { AdminContainer, H2, Input } from '../style';

const SearchBar = Input.extend`
  width: 100%;
`;

class MemberList extends LoadableComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentWillMount() {
    const { getMembers } = this.props;
    getMembers();
  }

  onSearch = e => {
    this.setState({ search: e.target.value });
  };

  renderSuccess = () => {
    const { members } = this.props;
    const { search } = this.state;
    return (
      <AdminContainer>
        <H2>Members</H2>
        <SearchBar
          placeholder="Search"
          value={search}
          onChange={this.onSearch}
        />
        <MemberGrid members={members} search={search} />
      </AdminContainer>
    );
  };
}

const mapStateToProps = state => ({
  members: state.members.members,
  status: state.members.membersStatus,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMembers: adminGetAllMembers,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
