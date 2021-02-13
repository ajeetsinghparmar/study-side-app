import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomListItem from '../components/CustomListItem';
import { Entypo } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync, sendPushNotification} from '../Notification'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const HomeScreen = ({ navigation }) => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const [floading, setFloading] = useState(false);
    const [bloading, setBloading] = useState(false)

      const [expoPushToken, setExpoPushToken] = useState('');
      const [notification, setNotification] = useState(false);
      const notificationListener = useRef();
      const responseListener = useRef();

      useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });

        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
      }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "StudySide",
            headerStyle: { backgroundColor: "#CDD4D3" },
            headerTitleStyle: { color: "#000" },
            headerTintColor: 'black',
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 20,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity onPress={async () => {

                        await sendPushNotification(expoPushToken, "Notification", "Menu Functionality is being developed" );
                    }} >
                    <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    })

    
    useEffect(() => {
        const fetchData = async () => {
            setFloading(true);
            try {
                const res = await axios.get(`https://studyside.herokuapp.com/api/blog/featured`);
                setFeaturedBlog(res.data[0]);
            }
            catch (err) {
                alert(err)
            }
            setFloading(false);
        }
        fetchData();

        return fetchData;
    }, []);
    useEffect(() => {
        const fetchBlogs = async () => {
            setBloading(true)
            try {
                const res = await axios.get(`https://studyside.herokuapp.com/api/blog/`);
                setBlogs(res.data);
            }
            catch (err) {
                alert(err)
            }
            setBloading(false)
        }
        fetchBlogs();
    }, []);


    const enterBlog = (id, slug, title) => {
        navigation.navigate('Blog', {
            id,
            slug,
            title
        });
    };


    return (
    <SafeAreaView>
        <View>
            <CustomListItem
                key={featuredBlog.key}
                id={featuredBlog.id}
                title={featuredBlog.title}
                slug={featuredBlog.slug}
                excerpt={featuredBlog.excerpt}
                enterBlog={enterBlog}
                featured
            />
        </View>
        {bloading? <ActivityIndicator size="large" color="#000" />
        :
    <ScrollView style={styles.container}>
        {blogs.map(({id, title, slug, excerpt}) => (
            <CustomListItem 
                key={id} 
                id={id} 
                title={title}
                slug={slug}
                excerpt={excerpt}
                enterBlog={enterBlog}
            />                
        ))}
    </ScrollView>}
</SafeAreaView>
    )
}

export default HomeScreen


const styles = StyleSheet.create({})
