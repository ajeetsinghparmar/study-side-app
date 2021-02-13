import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';



const BlogScreen = ({ navigation, route }) => {
    const [blog, setBlog] = useState({});

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                }}
                >
                    <Text style={{ color: 'white', marginLeft: 30, fontWeight: 'bold' }}>{route.params.title}</Text>
                    </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style={{ marginLeft: 10 }} 
                    onPress={navigation.goBack}
                >
                    <AntDesign 
                    name="arrowleft" 
                    size={24} 
                    color="white" 
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 20,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )

        })
    },[navigation])

    useEffect(() => {
        const slug = route.params.slug;

        const fetchData = async () => {
            try {
                const res = await axios.get(`https://studyside.herokuapp.com/api/blog/${slug}`)
                setBlog(res.data);
            } catch (error) {
                alert(error)
            }
        };
        fetchData();
    }, [route.params.slug]);


    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
    <>
            <WebView
                originWhitelist={['*']}
            source={{
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title></title>
                </head>
                <body>
                    ${blog.content || "Loading..."}
                </body>
                </html>`
            }}
            style={{marginTop: 20, fontSize: 80}}
            />
            </>
    )
}

export default BlogScreen

const styles = StyleSheet.create({})
