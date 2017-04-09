import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  RefreshControl
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Flux
import StockActions from '../../actions/stock-action';
import StockStore from '../../stores/stock-store';

// View Elements
import StockCell from './elements/stock-cell';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#202020',
  },
  topBlock: {
    flex: 1,
  },
  bottomBlock: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonLeft: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
  },
  buttonMiddle: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
  },
  buttonRight: {
    height: 36,
    borderColor: '#3CABDA',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#3CABDA',
  },
  buttonText: {
    fontSize: 14,
    color: '#3CABDA',
    alignSelf: 'center',
  },
  buttonTextSelected: {
    color: 'black',
  },
});

export default class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      indexDS: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      refreshing: false,
      key: Math.random(),
    }, StockStore.getState());
  }

  componentDidMount() {
    StockStore.listen(state => this.onStockStoreChange(state));
    StockActions.updateIndexes();
  }

  componentWillUnmount() {
    StockStore.unlisten(state => this.onStockStoreChange(state));
  }

  onStockStoreChange(state) {
    this.setState({
      indexDS: this.state.indexDS.cloneWithRows(state.indexList),
      indexResult: state.indexResult,
      key: Math.random(),
    });
  }


  onRefresh() {
    this.setState({ refreshing: true });
    StockActions.updateIndexes();
    this.setState({ refreshing: false });
  }


  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          statusBar={{ tintColor: '#202020', style: 'light-content' }}
          style={styles.navigatorBarIOS}
          title={{ title: this.props.title, tintColor: 'white' }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title={this.props.title}
          titleColor="white"
        />
      );
    }
  }

  render() {
    console.log('Overview', this.state.indexResult)
    return (
      <View style={styles.container}>
        {this.renderToolbar()}
        <View style={styles.topBlock}>
          <ListView
            key={this.state.key}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
            dataSource={this.state.indexDS}
            renderRow={stock => <StockCell stock={stock} indexResult={this.state.indexResult} />}
          />
        </View>
        <View style={styles.bottomBlock}>
          <TouchableHighlight
            style={[styles.buttonLeft, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonSelected : null]}
            underlayColor="#66CCFF"
            onPress={Actions.main}
          >
            <Text style={[styles.buttonText, this.state.selectedProperty === 'ChangeinPercent' ? styles.buttonTextSelected : null]}>
              Watchlist
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

Overview.propTypes = {
  title: React.PropTypes.string,
};

Overview.defaultProps = {
  title: '',
};
