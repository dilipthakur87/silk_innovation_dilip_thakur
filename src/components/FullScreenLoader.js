import React from "react";
import { Text, View, Modal, Dimensions, ActivityIndicator } from 'react-native';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const FullScreenLoader = (props) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isFetching}
        >
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    flexDirection: 'column',
                    backgroundColor: "rgba(0,0,0,0.6)",
                    width: window.width,
                    height: window.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator size='large' color='orange' />
                    <Text style={{ color: 'orange', fontSize: 20 * ratio, alignSelf: 'center' }}>{props.text ? props.text : 'Loading...'}</Text>
                </View>
            </View>
        </Modal>
    );
}

export default FullScreenLoader;
