import React from 'react';
import Products from './Products';
import Users from './Users';
import Orders from './Orders';
import Types from './Types';
import { connect } from 'react-redux';
import ItemMenuControl from './ItemMenuControl';
import Chart from './Chart';
import * as action from '../../redux/actions/action';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayComp: '',
      active: false
    }
  }

  componentDidMount(){
    this.setState({
      isDisplayComp: this.props.currentPage
    })
  }

  findCompByState = (isDisplayComp) => {
    switch (isDisplayComp) {
      case 'products':
        return < Products />
      case 'users':
        return < Users />
      case 'orders':
        return <Orders />
      case 'types':
        return < Types/>
      case 'chart':
        return <Chart />
      default:
        break;  
    }
  }
  onSelected = (name) => {
    this.props.setCurrentPage(name);
  }

  render() {
    const { currentPage } = this.props;
    const { listComp } = this.props;
    const listLi = listComp.map((elm, index) => {
      return <ItemMenuControl key={index} elm={elm} onSelected={this.onSelected} />
    });
    const isAdmin = JSON.parse(sessionStorage.getItem('account')).permission[1];
    const comp = this.findCompByState(currentPage);
    return (
      <div>
        {
          isAdmin !== "admin" ? <h3>You are not admin</h3> : <div className="row">
            <div className="col-md-3 bg-light">
              <h4 className="text-center bg-primary rounded text-white">Manage</h4>
              <ul className="list-group">
                {listLi}
              </ul>
            </div>
            <div className="col-md-9 bg-light justify-align-center">
              {comp}
            </div>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    listComp: state.ManageComps,
    currentPage: state.currentPage
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    setCurrentPage: (value) => {
      dispatch(action.setCurrentPage(value));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);