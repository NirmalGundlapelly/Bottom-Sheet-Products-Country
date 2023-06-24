import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import CustomCountryDropDown from '../components/CustomCountryDropDown';
import CustomStatesDropDown from '../components/CustomStatesDropDown';
import Countries from '../components/Contries.json';
import CustomDistrictDropDown from '../components/CustomDistrictDropDown';

import RBSheet from 'react-native-raw-bottom-sheet';

import Products from './Products';

interface IProps {}

interface IState {
  country: string;
  state: string;
  district: string;
  statesData: string[];
  districtData: string[];
}

export default class Home extends Component<IProps, IState> {
  state = {
    country: '',
    state: '',
    district: '',
    statesData: [],
    districtData: [],
  };

  handleSelect = (value: string, values: any) => {
    if (value == 'country') {
      this.setState({country: value, statesData: values.States});
    }
    if (value == 'state') {
      this.setState({state: value, districtData: values.Cities});
    }
    if (value == 'district') {
      this.setState({district: value});
    }

    // console.log('states', states.States);
    console.log('name', value);
  };

  handleGetData = () => {
    this.RBSheet.open();
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor={'#540227'} />
        <View style={{flex: 1, backgroundColor: '#540227'}}>
          <Text style={styles.dropHeading}>Drop Down</Text>
          <View style={styles.dropDownContainer}>
            <Text style={styles.valuHeadings}>Country :</Text>
            <CustomCountryDropDown
              name="country"
              selected={this.handleSelect}
              options={Countries.Countries}
            />
            {this.state.country != '' && (
              <View>
                <Text style={styles.valuHeadings}>State :</Text>
                <CustomStatesDropDown
                  name="state"
                  selected={this.handleSelect}
                  options={this.state.statesData}
                />
              </View>
            )}
            {this.state.state != '' && (
              <View>
                <Text style={styles.valuHeadings}>District :</Text>
                <CustomDistrictDropDown
                  name="district"
                  selected={this.handleSelect}
                  options={this.state.districtData}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={this.handleGetData}
            style={styles.getButton}>
            <Text style={{color: 'white', textAlign: 'center'}}>Get Data</Text>
          </TouchableOpacity>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={500}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent"
              },
              container: {
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
              },
              draggableIcon: {
                backgroundColor: "black",
              }
            }}>
            <Products />
          </RBSheet>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  dropDownContainer: {
    marginTop: 50,
    padding: 10,
  },
  dropHeading: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
  },
  valuHeadings: {
    marginBottom: 5,
    marginTop: 5,
    color: 'white',
  },
  getButton: {
    position: 'absolute',
    bottom: 350,
    left: Dimensions.get('window').width / 4,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 200,
    borderRadius: 15,
  },
});
