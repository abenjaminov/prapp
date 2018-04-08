import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity,TextInput,Button, ScrollView, SectionList} from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ScreenStyle from '../Config/Styles'
import { Actions } from '../lib/Consts';
import DrawerButton from '../Components/DrawerButton/DrawerButton';
import Hidden from '../Components/Hidden/Hidden'

const styles = StyleSheet.create({
    searchInput : { 
        flex : 1,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderWidth: 2,
        borderColor : 'lightgrey',
        paddingLeft : 10,
      },
      searchResults : {
          flex : 14
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      sectionButton : {
        flex : 1,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      },
      itemButton : {
        flex : 1,
        backgroundColor: 'white',
        padding: 2,
        borderBottomWidth: 1,
        borderColor : 'black',
      }
})

const RenderSearchSectionTitle = (section) => (
    <TouchableOpacity style={styles.sectionButton} onPress={() => x++}>
        <Text style={styles.sectionHeader}>{section.sectionName}</Text>
    </TouchableOpacity>
)

const RenderSearchItem = (navigation, item, selectDrill, goToNewResultScreen) => (
    <TouchableOpacity style={styles.itemButton} onPress={() => {
        selectDrill(item);
        goToNewResultScreen();
        }}>
        <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
)

const SearchScreen = ({navigation, searchTextChanged, selectDrill, searchText, searchSections, goToNewResultScreen}) =>  (
    <View style={ScreenStyle.verticalContainer}>
        <TextInput style={styles.searchInput} underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(text) => searchTextChanged(text)} value={searchText}
                    onFocus={(x) => searchTextChanged("")}/>
        <View style={styles.searchResults}>
            <ScrollView keyboardShouldPersistTaps="always">
                <SectionList sections={searchSections} 
                            renderItem={({item}) => RenderSearchItem(navigation, item,selectDrill, goToNewResultScreen)}
                            renderSectionHeader={({section}) => RenderSearchSectionTitle(section)} 
                            keyExtractor={(item, index) => index}/>
            </ScrollView>
        </View>
    </View>
)

SearchScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  
  SearchScreen.navigationOptions = {
    title: 'Search Screen',
  };
  
  const mapStateToProps = state => ({
    searchText : state.newResult.searchText,
    searchSections : state.newResult.searchSections
  });
  
  const mapDispatchToProps = dispatch => ({
    searchTextChanged: (searchText) => dispatch({ type: Actions.NewResult.SEARCH_DRILL, searchText}),
    selectDrill : (drill) => dispatch({type : Actions.NewResult.SELECT_DRILL, drill}),
    goToNewResultScreen : () => dispatch({type : Actions.Navigation.NEW_RESULT_SCREEN})
  });
  
  export default {
      screen : connect(mapStateToProps, mapDispatchToProps)(SearchScreen),
      navigationOptions : {
        title : "Search Drill",
        drawerLabel: <Hidden />
      }
  }