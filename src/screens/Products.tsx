import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Component} from 'react';
import axios from 'axios';

interface IProps {
  navigation?: any;
}

interface IState {
  products: string[];
  searchText: string;
  filteredValue: any;
  isLoading: boolean;
}

export default class Products extends Component<IProps, IState> {
  state = {products: [], searchText: '', filteredValue: '', isLoading: true};

  componentDidMount(): void {
    this.getAllProducts();
    console.log('bottom Called');
  }

  getAllProducts = async () => {
    await axios.get('https://dummyjson.com/products').then(response =>
      // console.log(response.data.products)
      this.setState({products: response.data.products, isLoading: false}),
    );
  };

  renderProductItem = (item: any) => {
    return (
      <>
        <TouchableHighlight>
          <View style={styles.productItem}>
            <View style={styles.itemCardContainer}>
              <Image style={styles.thumbnail} source={{uri: item.thumbnail}} />
              <View style={styles.itemPriceContainer}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}.00</Text>
                <Text style={styles.itemRating}>Rating: *{item.rating}</Text>
                <Text style={styles.itemCategoryText}>
                  Category: {item.category}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </>
    );
  };

  render() {
    const {products, searchText, filteredValue} = this.state;
    console.log(filteredValue);
    const finalList = products.filter((eachObj: any) =>
      eachObj.title.toLowerCase().includes(searchText.toLowerCase().trim()),
    );

    // Sorting the products
    switch (filteredValue) {
      case 'priceLH':
        finalList.sort((a: {price: number}, b: {price: number}) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        break;
      case 'priceHL':
        finalList.sort((a: {price: number}, b: {price: number}) => {
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
        });
        break;
      case 'titleAZ':
        finalList.sort((a: {title: string}, b: {title: string}) => {
          if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
          }
          if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        break;
      case 'titleZA':
        finalList.sort((a: {title: string}, b: {title: string}) => {
          if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return -1;
          }
          if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        break;
      case 'categoryAZ':
        finalList.sort((a: {category: string}, b: {category: string}) => {
          if (a.category.toUpperCase() < b.category.toUpperCase()) {
            return -1;
          }
          if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        break;
      case 'categoryZA':
        finalList.sort((a: {category: string}, b: {category: string}) => {
          if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return -1;
          }
          if (a.category.toUpperCase() < b.category.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        break;
    }

    return (
      <View style={{marginTop: 0}}>
        {/* Nav Bar */}
        <View style={styles.navBarContainer}>
          <Text style={styles.navHeading}>Products</Text>
          <TextInput
            value={searchText}
            style={styles.input}
            keyboardType="web-search"
            placeholder="Search Products"
            placeholderTextColor={'black'}
            onChangeText={text => this.setState({searchText: text.trim()})}
          />
        </View>
        <View>
          {/* Flat Container */}
          <View style={styles.productFlatContainer}>
            {this.state.isLoading ? (
              <View style={{marginTop:100}}>

              <ActivityIndicator  color={'white'} size="large"/>
              </View>
            ) : (
              <>
                {/* Filter Tab */}
                {finalList.length === 0 ? (
                  <Text style={styles.noProductsAvailableText}>
                    No Products Available
                  </Text>
                ) : (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={finalList}
                    renderItem={({item}) => this.renderProductItem(item)}
                    keyExtractor={(item: any) => item.id}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    //   backgroundColor: '#2973f0',
    height: 60,
  },
  navHeading: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productHeading: {
    backgroundColor: '#f79934',
    padding: 10,
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  productFlatContainer: {
    height: '88%',
    padding: 1,
    backgroundColor: '#540227',
    margin: 10,
    borderRadius: 10,
  },
  productItem: {
    padding: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    margin: 5,
    height: 180,
  },
  thumbnail: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    height: '100%',
    width: '40%',
  },
  itemTitleText: {
    width: '60%',
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCategoryText: {
    // width: '50%',
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
  },
  itemCardContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPriceContainer: {
    width: 300,
    marginLeft: 20,
  },
  itemPrice: {
    color: 'green',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemRating: {
    color: '#f79934',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingBottom: 5,
  },

  // Input
  input: {
    height: 40,
    width: 200,
    borderRadius: 5,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 10,
    marginTop: 10,
  },

  // Drop Down
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {fontSize: 16},

  // Empty Products List View
  noProductsAvailableText: {
    color: 'white',
    fontSize: 30,
    marginTop: 70,
    textAlign: 'center',
  },
});
