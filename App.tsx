import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

interface TypeTextInput {
  text: string;
  id: number;
  isRequired: boolean;
}
const getUniqueId = () => {
  let id = 0;
  const generateNewId = () => ++id;
  return generateNewId;
};

const generate_uuid = getUniqueId();
const dummyData: TypeTextInput = {
  text: '',
  id: generate_uuid(),
  isRequired: false,
};

function App(): JSX.Element {
  const [textInput, setTextInput] = useState<TypeTextInput[]>([{...dummyData}]);
  const [text, setText] = useState(1);
  useEffect(() => {
    console.log(text);

    setText(text + 1);
  }, []);
  const addNewTextBox = () => {
    let tempTextInputs = [...textInput, {...dummyData, id: generate_uuid()}];
    setTextInput(tempTextInputs);
  };
  const deleteTextBox = (id: number) => () => {
    let tempTextInput = textInput.filter(inputBox => inputBox.id !== id);
    setTextInput(tempTextInput);
  };
  const handleChangeText = (targetId: number) => (txt: string) => {
    let tempTextInput: TypeTextInput[] = [];
    textInput.forEach(({id, text, isRequired}) => {
      if (targetId === id) {
        tempTextInput.push({id, text: txt, isRequired});
      } else {
        tempTextInput.push({id, text, isRequired});
      }
    });
    setTextInput(tempTextInput);
  };
  const onDone = () => {
    let tempTextInput: TypeTextInput[] = [];
    let allGood = true;
    tempTextInput = textInput.map(({id, text}) => {
      if (!text) allGood = false;
      return {id, text, isRequired: !text ? true : false};
    });
    setTextInput(tempTextInput);
    if (!allGood) {
      return;
    }
  };

  const renderItem = ({id, text, isRequired}: TypeTextInput, index: number) => {
    return (
      <View key={id} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.textBoxContainer}>
            <TextInput
              key={id}
              placeholder="Enter Value"
              value={text}
              style={styles.inputStyle}
              onChangeText={handleChangeText(id)}
            />
            {index !== 0 ? (
              <Pressable
                style={styles.removeInputBox}
                onPress={deleteTextBox(id)}>
                <Text style={styles.btnText}>X</Text>
              </Pressable>
            ) : (
              <View style={{flex: 0.101}} />
            )}
          </View>
          {!!isRequired ? (
            <Text style={{color: 'red', marginBottom: 8}}>
              This filed is required*
            </Text>
          ) : null}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Pressable style={styles.btnStyle} onPress={addNewTextBox}>
            <Text>Add+</Text>
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {textInput.map(renderItem)}
        </ScrollView>
        <TouchableOpacity onPress={onDone} style={styles.doneStyle}>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  inputStyle: {
    backgroundColor: '#dadada',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    flex: 1,
  },
  btnStyle: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: 'yellow',
    width: '100%',
    height: 80,
  },
  textBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeInputBox: {
    marginLeft: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {color: 'white'},
  doneStyle: {
    backgroundColor: 'green',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default App;
