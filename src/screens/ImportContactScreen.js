import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {Avatar, Checkbox, IconButton, List} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx';
import {colors} from '../theme';
import NoDataImage from './NoDataImage';

// import file from '../assets/'
const HandleDocument = () => {
  // const [pickedDocument, setPickedDocument] = useState(null);

  const [selectAll, setselectAll] = useState(false);
  const [phoneData, setPhoneData] = useState([]);
  const navigation = useNavigation();
  // const downloadFile = async () => {
  //   const sourcePath =RNFS.MainBundlePath + 'assets/phone_book.xlsx'; // Path to your bundled XLSX file
  //   const targetPath = RNFS.DocumentDirectoryPath + '/phone_book.xlsx'; // Target path in the document directory
  //   try {
  //     await RNFS.copyFile(sourcePath, targetPath);
  //     console.log('File copied to:', targetPath);
  //   } catch (error) {
  //     console.error('Error copying file:', error);
  //   }
  // };

  // alert(RNFS.DocumentDirectoryPath)

  // RNFS.readDir(RNFS.DocumentDirectoryPath).then(files => {
  //   alert(JSON.stringify(files));
  // });

  // const downloadFile = async () => {
  //   const downloadPath = `${RNFS.DownloadDirectoryPath}/phone_book.xlsx`;
  //   const sourceFileName = 'phone_book.xlsx'; // Replace with your actual file name
  //   const filePath = `${sourceFileName}`; // Full source path
  //   const { config, fs } = RNFetchBlob;
  //   try {
  //     const binary = await RNFS.copyFileAssets(filePath,downloadPath);
  //     await config({
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         path: filePath,
  //         description: 'Downloading file',
  //       },
  //     })
  //       .fetch('GET', downloadPath)
  //     console.log('File copied to:', binary);
  //   } catch (error) {
  //     console.error('Error copying file:', error);
  //   }
  // };

  useEffect(() => {
    navigation.setOptions({
      headerRight: props => (
        <IconButton
          icon="file-download-outline"
          size={30}
          iconColor="#fff"
          onPress={() => downloadFile()}
        />
      ),
    });
  }, []);

  const downloadFile = async () => {
    const fileUrl = 'https://ik.imagekit.io/arcus/phonebook/phone_book.xlsx'; // Replace with your actual file URL
    const fileName = 'phone_book.xlsx';

    // Use the Android Download Manager for Android
    if (Platform.OS === 'android') {
      try {
        const {config, fs} = RNFetchBlob;
        const DownloadDir = fs.dirs.DownloadDir;
        const filePath = `${DownloadDir}/${fileName}`;

        await config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: filePath,
            description: 'Downloading file',
          },
        }).fetch('GET', fileUrl);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    } else {
      console.warn('Download Manager is only available on Android.');
    }
  };

  const handleChecked = index => {
    const updatedPhoneData = [...phoneData];
    updatedPhoneData[index].isSelected = !updatedPhoneData[index].isSelected;
    setPhoneData(updatedPhoneData);

    const GetSelecteddata = phoneData.filter(adata => adata.isSelected);

    if (updatedPhoneData.length == GetSelecteddata.length) {
      setselectAll(true);
    } else {
      setselectAll(false);
    }
  };

  const handleCheckedAll = () => {
    const allupdatedPhoneData = phoneData.every(item => item.isSelected);
    console.log(allupdatedPhoneData);
    const updatedPhoneData = phoneData.map(item => ({
      ...item,
      isSelected: !allupdatedPhoneData,
    }));
    console.log(updatedPhoneData.length);

    if (!allupdatedPhoneData) {
      setselectAll(true);
    } else {
      setselectAll(false);
    }
    setPhoneData(updatedPhoneData);
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.xlsx],
        allowMultiSelection: false,
      });
      if (result.length == 0) return;
      const fileUri = result[0].uri;
      console.log(fileUri);
      // Ensure that the 'uri' property is defined before attempting to read the file
      if (fileUri) {
        const fileContent = await RNFS.readFile(fileUri, 'base64');
        // Parse Excel content using xlsx library
        const workbook = XLSX.read(fileContent, {type: 'base64'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // Extract data from the sheet
        const data = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          blankrows: false,
        });
        const updateData = [...data].slice(1).map(data => {
          return {
            firstname: data[0],
            lastname: data[1],
            phone: data[2],
            email: data[3],
            address: data[4],
            isSelected: false,
          };
        });
        setPhoneData(() => updateData);
        console.log(updateData);
      } else {
        console.warn('File URI is undefined');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  return (
    <View style={{gap: 20, flex: 1, backgroundColor: '#fff'}}>
      {phoneData.length > 0 ? (
        <>
          {/* <Button title="Pick Document" onPress={handlePickFile} /> */}
          <View
            style={{gap: -20, justifyContent: 'center', alignItems: 'center'}}>
            {/* <TouchableOpacity style={styles.button} onPress={handlePickFile}>
          <Text style={styles.buttontext}>Upload File</Text>
        </TouchableOpacity> */}
            <IconButton
              icon="upload"
              size={30}
              iconColor={colors.primary}
              onPress={handlePickFile}
            />
            <Text style={{color: colors.primary}}>Upload</Text>
          </View>

          {/* <Button title="Download Sample" onPress={downloadFile} /> */}

          <FlatList
            data={phoneData}
            ListHeaderComponent={() => (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingHorizontal: 25,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{color: '#000'}}>All</Text>

                <Checkbox
                  // size={30}
                  color={colors.primary}
                  status={selectAll ? 'checked' : 'unchecked'}
                  onPress={handleCheckedAll}
                />
              </View>
            )}
            ListFooterComponent={() => <View style={{height: 50}} />}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    // navigation.navigate('View Contact', item);
                  }}>
                  <List.Item
                    // onPress={() => handleChecked(index)}
                    left={() => (
                      <Avatar.Text
                        style={{
                          backgroundColor: colors.primary,
                          fontFamily: 'Poppins-Light',
                        }}
                        label={String(item?.firstname)?.charAt(0)}
                      />
                    )}
                    right={() => (
                      <Checkbox
                        color={colors.primary}
                        status={item?.isSelected ? 'checked' : 'unchecked'}
                        onPress={() => handleChecked(index)}
                      />
                    )}
                    style={{
                      backgroundColor: '#FFF',
                      paddingHorizontal: 15,
                      fontFamily: 'Poppins-Light',
                    }}
                    title={item.firstname}
                    description={item.phone}
                    titleStyle={{
                      fontSize: 20,
                      color: '#000',
                      fontFamily: 'Poppins-Light',
                    }}
                    descriptionStyle={{
                      fontSize: 18,
                      color: 'grey',
                      alignItems: 'center',
                      fontFamily: 'Poppins-Light',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />

          {/* {pickedDocument && (
        <View>
          <Text>Selected Document:</Text>
          <Text>URI: {pickedDocument.uri}</Text>
          <Text>Type: {pickedDocument.type}</Text>
          <Text>Size: {pickedDocument.size} bytes</Text>
        </View>
      )} */}
        </>
      ) : (
        <NoDataImage handlePickFile={handlePickFile} />
      )}
    </View>
  );
};

export default HandleDocument;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 5,
    marginTop: 30,
    // marginLeft:10,
    // marginRight: 10,
  },
  buttontext: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Light',
  },
});
