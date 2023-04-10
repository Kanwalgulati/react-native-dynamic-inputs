import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface TypeTextInput {
  text: string;
  id: number;
  isRequired: boolean;
  type?: string;
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

const data: TypeTextInput[] = [
  {id: 1, text: '', isRequired: false, type: 'numeric'},
  {id: 2, text: '', isRequired: false, type: 'email-address'},
  {id: 3, text: '', isRequired: false, type: 'phone-pad'},
  {id: 4, text: '', isRequired: false, type: 'url'},
  {id: 5, text: '', isRequired: false, type: 'numeric'},
];

function App(): JSX.Element {
  // const [textInput, setTextInput] = useState<TypeTextInput[]>([{...dummyData}]);
  const [textInput, setTextInput] = useState<TypeTextInput[]>([...data]);

  const addNewTextBox = () => {
    if (data.length) return;
    let tempTextInputs = [...textInput, {...dummyData, id: generate_uuid()}];
    setTextInput(tempTextInputs);
  };
  const deleteTextBox = useCallback(
    (id: number) => () => {
      let tempTextInput = textInput.filter(inputBox => inputBox.id !== id);
      setTextInput(tempTextInput);
    },
    [textInput],
  );
  const handleChangeText = useCallback(
    (targetId: number) => (txt: string) => {
      let tempTextInput: TypeTextInput[] = [];

      textInput.forEach(({id, text, isRequired, type}) => {
        if (targetId === id) {
          tempTextInput.push({id, text: txt, isRequired, type});
        } else {
          tempTextInput.push({id, text, isRequired, type});
        }
      });
      setTextInput(tempTextInput);
    },
    [textInput],
  );

  const onDone = useCallback(() => {
    let tempTextInput: TypeTextInput[] = [];
    let allGood = true;
    tempTextInput = textInput.map(({id, text, type}) => {
      if (!text) allGood = false;
      return {id, text, isRequired: !text ? true : false, type: type};
    });
    setTextInput(tempTextInput);
    if (!allGood) {
      return;
    }
  }, [textInput]);

  const renderItem = (
    {id, text, isRequired, type}: TypeTextInput,
    index: number,
  ) => {
    return (
      <View key={id} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.textBoxContainer}>
            <TextInput
              key={id}
              placeholder="Enter Value"
              value={text}
              style={styles.inputStyle}
              keyboardType={type ? type : 'default'}
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentOffset={{x: 100, y: 323}}>
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
    height: 50,
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
