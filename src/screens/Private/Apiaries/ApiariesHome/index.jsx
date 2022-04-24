/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Title1, Title2 } from '@components/typography';
import { ExpensiveNote, TextInput, useToast } from '@components';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@theme';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import { Add, CheckOutline } from '@assets';
import { Header } from '@components/layout';
import { useNetInfo } from '@react-native-community/netinfo';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import { db } from '@services/firebase';
import { userUid } from '@store/auth';
import { useSelector } from 'react-redux';

function ApiariesHome() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [editedText, setEditedText] = useState();
  const netInfo = useNetInfo();
  const userUuid = useSelector(userUid);
  const [apiaries, setApiaries] = useState([]);
  const toast = useToast();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  const styles = StyleSheet.create({
    container: {
      paddingBottom: 55,
    },
    scrollView: {
      flexGrow: 1,
      marginHorizontal: 16,
      marginVertical: 8,
      justifyContent: 'center',
    },
    button: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.primary,
    },
    add: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    iconContainer: {
      borderWidth: 2,
      borderColor: colors.secondary,
      height: 25,
      width: 25,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
    },
    iconMargin: { marginRight: 8 },
  });

  const getData = async () => {
    setRefreshing(true);
    const hasInternet = netInfo.isConnected;
    if (hasInternet) {
      try {
        const querySnapshot = query(
          collection(db, `users/${userUuid}/apiaries`),
          orderBy('name', 'asc'),
        );
        const docsSnap = await getDocs(querySnapshot);
        setApiaries([]);
        docsSnap.forEach((item) => {
          setApiaries((oldArray) => [...oldArray, item.data()]);
        });
      } catch (error) {
        toast.error(error.code);
      }
    } else {
      toast.error(t('translations:noInternet'));
    }
    setRefreshing(false);
    setIsPullRefreshing(false);
  };

  useEffect(() => {
    const hasInternet = netInfo.isConnected;
    if (hasInternet !== null) {
      getData();
    }
  }, [netInfo, isFocused]);

  useEffect(() => {
    const handleListTitle = apiaries.filter((item) =>
      item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
    setEditedText(handleListTitle);
  }, [searchText]);

  const handleToApiary = (index) => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'ApiaryHome',
      params: { ...apiaries[index] },
    });
  };

  const handleApiaries = (apiary, index) => {
    return (
      <ExpensiveNote
        key={apiary.code}
        data={apiary}
        hasData
        mode="apiary"
        onPress={() => handleToApiary(index)}
      />
    );
  };

  const handleAddApiary = () => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'CreateApiaryPersonalInfo',
    });
  };

  const handleCheckViability = () => {
    navigation.navigate('ApiaryNavigation', {
      screen: 'CheckViability',
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('HomeScreen');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Header title={t('translations:apiaries')} onGoBack={handleHome} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            progressBackgroundColor={colors.secondary}
            refreshing={isPullRefreshing}
            onRefresh={() => {
              setIsPullRefreshing(true);
              getData();
            }}
          />
        }
      >
        <View style={styles.add}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddApiary()}
          >
            <View style={styles.iconContainer}>
              <Add size={25} color={colors.secondary} />
            </View>
            <Title1 centered color={colors.secondary}>
              {t('translations:add')}
            </Title1>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCheckViability()}
          >
            <View style={styles.iconMargin}>
              <CheckOutline size={30} color={colors.secondary} />
            </View>

            <Title1 centered color={colors.secondary}>
              {t('translations:viability')}
            </Title1>
          </TouchableOpacity>
        </View>
        {refreshing ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            {apiaries.length > 0 && (
              <View style={{ marginBottom: 8 }}>
                <TextInput
                  onChangeText={(text) => setSearchText(text)}
                  value={searchText}
                  name="search"
                  placeholderTextColor={colors.primary}
                  placeholder={t('translations:searchApiary')}
                />
              </View>
            )}

            {searchText === '' ? (
              apiaries.length > 0 ? (
                apiaries.map((apiary, index) => handleApiaries(apiary, index))
              ) : (
                <ExpensiveNote hasData={false} mode="apiary" />
              )
            ) : editedText.length > 0 ? (
              editedText.map((apiary, index) => handleApiaries(apiary, index))
            ) : (
              <Title2 centered color={colors.primary}>
                {t('translations:nothingFound')}
              </Title2>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
export default ApiariesHome;
