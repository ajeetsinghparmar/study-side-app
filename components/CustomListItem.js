import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

const CustomListItem = ({id, title, slug, excerpt, enterBlog}) => {
    
    const [chatMessages, setChatMessages] = useState([]);

    return (

        <ListItem 
            key={id} 
            onPress={() => enterBlog(id, slug, title)} key={id} bottomDivider
        >

            <ListItem.Content>
                <ListItem.Title
                    style={{ fontWeight: "bold" }}>
                    {title}
                </ListItem.Title>
                <ListItem.Subtitle 
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {excerpt}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
