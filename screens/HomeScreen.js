import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomListItem from '../components/CustomListItem';
import { Entypo } from '@expo/vector-icons'


const HomeScreen = ({ navigation }) => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    const [floading, setFloading] = useState(false);
    const [bloading, setBloading] = useState(false)

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
                    <TouchableOpacity>
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
    </ScrollView>
</SafeAreaView>
    )
}

export default HomeScreen


const styles = StyleSheet.create({})
