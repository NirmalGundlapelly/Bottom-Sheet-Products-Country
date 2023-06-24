import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Countries from './Contries.json';


interface IState {
  isOpen: boolean;
  selectedValue: null | string;
  searchText: string;
  filteredOptions: any;
}
interface IProps {
  options: string[];
  selected: any;
  name: string;
}

class CustomCountryDropDown extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
      selectedValue: null,
      searchText: '',
      filteredOptions: props.options,
    };
  }

  toggleDropdown = () => {
    const {name} = this.props;
    if (name == 'country') {
      this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }

    if (name == 'district') {
      this.setState(prevState => ({isOpen: !prevState.isOpen}));
    }
  };

  selectOption = (value: string | null) => {
    const {selected, name} = this.props;
    const availableState = Countries.Countries.find(
      s => s.CountryName === value,
    );

    this.setState({selectedValue: value, isOpen: false});
    selected(name, availableState);
  };

  handleSearch = (text: string) => {
    const {options} = this.props;
    const filteredOptions = Countries.Countries.filter((option: any) =>
      option.CountryName.toLowerCase().includes(text.toLowerCase()),
    );
    this.setState({searchText: text, filteredOptions});
  };

  render() {
    const {filteredOptions, isOpen, selectedValue, searchText} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={this.toggleDropdown}>
          <Text style={{color:'white'}}>{selectedValue || 'Select Country'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdownOptions}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={this.handleSearch}
            />
            <ScrollView style={{height: 300, borderRadius:10}}>
              {filteredOptions.map((option: any) => (
                <TouchableOpacity
                  key={option.CountryName}
                  style={styles.option}
                  onPress={() => this.selectOption(option.CountryName)}>
                  <Text>{option.CountryName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    borderRadius:10
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10
  },
  option: {
    padding: 10,
  },
});

export default CustomCountryDropDown;
