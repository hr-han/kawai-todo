import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get('window');

export default class ToDo extends Component {
                 constructor(props) {
                   console.log(props);
                   
                   super(props);
                   this.state = {
                     isEditing: false,
                     toDoValue: props.text
                   };
                 }
                 static propTypes = {
                   text: PropTypes.string.isRequired,
                   isCompleted: PropTypes.bool.isRequired,
                   deleteToDo: PropTypes.func.isRequired,
                   id: PropTypes.string.isRequired,
                   completeToDo: PropTypes.func.isRequired,
                   unCompleteToDo: PropTypes.func.isRequired,
                   updateToDo: PropTypes.func.isRequired
                 };

                 render() {
                   const { isEditing, toDoValue } = this.state;
                   const { text, id, deleteToDo, isCompleted } = this.props;
                   return (
                     <View style={styles.container}>
                       <View style={styles.column}>
                         <TouchableOpacity onPress={this._toggleCompleteToDo}>
                           <View
                             style={[
                               styles.circle,
                               isCompleted
                                 ? styles.completeCircle
                                 : styles.unCompleteCircle
                             ]}
                           />
                         </TouchableOpacity>
                         {isEditing ? (
                           <TextInput
                             style={[
                               styles.text,
                               styles.input,
                               isCompleted
                                 ? styles.completeText
                                 : styles.unCompleteText
                             ]}
                             value={toDoValue}
                             onChangeText={this._controlInput}
                             multiline={true}
                             returnKeyType={"done"}
                             onBlur={this._finishEditing}
                             autoCorrect={false}
                             underlineColorAndroid={"transparent"}
                           />
                         ) : (
                           <Text
                             style={[
                               styles.text,
                               isCompleted
                                 ? styles.completeText
                                 : styles.unCompleteText
                             ]}
                           >
                             {text}
                           </Text>
                         )}
                       </View>
                       {isEditing ? (
                         <View style={styles.actions}>
                           <TouchableOpacity onPressOut={this._finishEditing}>
                             <View style={styles.actionsContainer}>
                               <Text style={styles.actionsText}>✅</Text>
                             </View>
                           </TouchableOpacity>
                         </View>
                       ) : (
                         <View style={styles.actions}>
                           <TouchableOpacity onPressOut={this._startEditing}>
                             <View style={styles.actionsContainer}>
                               <Text style={styles.actionsText}>✏</Text>
                             </View>
                           </TouchableOpacity>
                           <TouchableOpacity onPressOut={(event) => { event.stopPropagation; deleteToDo(id)}}>
                             <View style={styles.actionsContainer}>
                               <Text style={styles.actionsText}>❌</Text>
                             </View>
                           </TouchableOpacity>
                         </View>
                       )}
                     </View>
                   );
                 }
                 _toggleCompleteToDo = (event) => {
                   event.stopPropagation();
                   const {
                     isCompleted,
                     unCompleteToDo,
                     completeToDo,
                     id
                   } = this.props;
                   if (isCompleted) {
                     unCompleteToDo(id);
                   } else {
                     completeToDo(id);
                   }
                 };

                 _startEditing = (event) => {
                   event.stopPropagation();
                   const { text } = this.props;
                   this.setState({
                     isEditing: true,
                     toDoValue: text
                   });
                 };
                 _finishEditing = (event) => {
                   event.stopPropagation();
                    const {updateToDo, id} = this.props;
                    const {toDoValue} = this.state;
                    updateToDo(id, toDoValue)
                   this.setState({
                     isEditing: false
                   });
                 };
                 _controlInput = text => {
                   this.setState({
                     toDoValue: text
                   });
                 };
               }

const styles = StyleSheet.create({
    container: {
        width: width -50,
        borderBottomColor:'#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    column: {
        flexDirection:'row',
        alignItems:'center'
        // justifyContent:'space-between',
        // width: width / 2
    },
    circle: {
        width:30,
        height:30,
        borderRadius:15,
        marginRight:20,
        borderColor:'red',
        borderWidth:3
    },
    completeCircle: {
        borderColor: '#bbb'
    }, 
    unCompleteCircle: {
        borderColor: '#F23657',
    }
    ,text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 20
    },
    completeText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    unCompleteText: {
        color: '#353839'
    },
    actions: {
        flexDirection:'row'
    },
    actionsContainer: {
        marginVertical:10,
        marginHorizontal:10
    },
    input: {
        marginVertical:15,
        width: width / 2,
        paddingBottom:5
    }

})