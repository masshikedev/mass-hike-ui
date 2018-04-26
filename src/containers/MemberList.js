import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import LoadableComponent from '../components/LoadableComponent';
import MemberGrid from '../components/admin/members/MemberGrid';
import AdminPage from '../components/admin/AdminPage';
import { adminGetAllMembers } from '../actions/MemberActions';
import { AdminContainer, H2, Input, GridParent, Button } from '../style';
import styled from 'styled-components';

const SearchBar = Input.extend`
  width: 100%;
`;

const TitleColumn = styled.div`
  grid-column: span 9;
`;

const ButtonColumn = styled.div`
  grid-column: span 3;
`;

const NewMemberButton = Button.extend`
  margin-top: 20px;
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
    const { members, toNew } = this.props;
    const { search } = this.state;
    return (
      <AdminContainer>
        <GridParent>
          <TitleColumn>
            <H2>Members</H2>
          </TitleColumn>
          <ButtonColumn>
            <NewMemberButton onClick={toNew}>New Member</NewMemberButton>
          </ButtonColumn>
        </GridParent>
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
      toNew: () => push('/admin/members/new'),
    },
    dispatch
  );

export default AdminPage(
  connect(mapStateToProps, mapDispatchToProps)(MemberList)
);
