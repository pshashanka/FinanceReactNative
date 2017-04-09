import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// 3rd party libraries
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 2,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default class StockCell extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.symbol}>
          <Text style={styles.symbolText}>
          {this.props.indexResult && this.props.indexResult[this.props.stock.symbol] && (this.props.indexResult[this.props.stock.symbol].Name || this.props.stock.symbol)}
          </Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.priceText}>
            {this.props.indexResult && this.props.indexResult[this.props.stock.symbol] && this.props.indexResult[this.props.stock.symbol].LastTradePriceOnly}
          </Text>
        </View>
      </View>
    );
  }
}

StockCell.propTypes = {
  indexResult: React.PropTypes.shape({}),
  stock: React.PropTypes.shape({
    symbol: React.PropTypes.string,
  }),
};

StockCell.defaultProps = {
  indexResult: [],
  stock: {},
};
