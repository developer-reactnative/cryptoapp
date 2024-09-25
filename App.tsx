import React, { useState, useEffect } from 'react';
import {
    View, Text,
    TouchableOpacity, ScrollView,
    FlatList, StyleSheet
} from 'react-native';
import Icon
    from 'react-native-vector-icons/FontAwesome';

const CryptoWalletApp = () => {
    const [walletBalance, setWalletBalance] = useState(0);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([
        { id: 1, name: 'Bitcoin', balance: 0.25, icon: 'btc' },
        { id: 2, name: 'Ethereum', balance: 2.5, icon: 'eth' },
        { id: 3, name: 'Litecoin', balance: 5.0, icon: 'ltc' },
        { id: 4, name: 'Ripple', balance: 500, icon: 'xrp' },
        { id: 5, name: 'Cardano', balance: 3000, icon: 'ada' },
        { id: 6, name: 'Polkadot', balance: 10, icon: 'dot-circle' },
        { id: 7, name: 'Chainlink', balance: 50, icon: 'link' },
        { id: 8, name: 'Stellar', balance: 800, icon: 'xlm' },
        { id: 9, name: 'Uniswap', balance: 3, icon: 'university' },
        { id: 10, name: 'Dogecoin', balance: 1000, icon: 'dogecoin' },
        { id: 11, name: 'Bitcoin Cash', balance: 1.5, icon: 'btc' },
        { id: 12, name: 'Litecoin', balance: 4.0, icon: 'ltc' },
        { id: 13, name: 'Ripple', balance: 700, icon: 'xrp' },
        { id: 14, name: 'Cardano', balance: 2000, icon: 'ada' },
        { id: 15, name: 'Polkadot', balance: 15, icon: 'dot-circle' },
        { id: 16, name: 'Chainlink', balance: 80, icon: 'link' },
        { id: 17, name: 'Stellar', balance: 1200, icon: 'xlm' },
        { id: 18, name: 'Uniswap', balance: 5, icon: 'university' },
        { id: 19, name: 'Dogecoin', balance: 800, icon: 'dogecoin' },
        { id: 20, name: 'Bitcoin Cash', balance: 2.0, icon: 'btc' },
    ]);

    const [buttonAction, setButtonAction] = useState('');
    const [buttonData, setButtonData] = useState(null);

    useEffect(() => {
        const totalBalance =
            cryptoCurrencies.reduce(
                (sum, crypto) =>
                    sum + crypto.balance, 100);
        setWalletBalance(totalBalance);
    }, [cryptoCurrencies]);

    const handleButtonPress = (action) => {
        switch (action) {
            case 'send':
                setButtonAction('Send');
                setButtonData({
                    recipient: 'ada',
                    amount: 0.08,
                    currency: 'BTC',
                });
                break;
            case 'request':
                setButtonAction('Request');
                setButtonData({
                    sender: 'SampeSender',
                    amount: 0.10,
                    currency: 'BTC',
                });
                break;
            case 'history':
                setButtonAction('Transaction History');
                setButtonData([
                    {
                        id: 1, type: 'Sent',
                        amount: 0.005, currency: 'BTC'
                    },
                    {
                        id: 2, type: 'Received',
                        amount: 0.01, currency: 'BTC'
                    },
                    {
                        id: 3, type: 'Sent',
                        amount: 0.015, currency: 'BTC'
                    },
                ]);
                break;
            default:
                break;
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.cryptoItem}>
            <Icon name={item.icon}
                size={30} color="#3498db" />
            <View>
                <Text style={styles.cryptoName}>
                    {item.name}
                </Text>
                <Text style={styles.cryptoBalance}>
                    {item.balance}
                    {item.name}
                </Text>
            </View>
        </View>
    );

    const renderButtonData = () => {
        if (!buttonData) {
            return null;
        }

        if (Array.isArray(buttonData)) {
            return (
                <View style={styles.buttonDataContainer}>
                    <Text style={styles.buttonActionText}>
                        {buttonAction}
                    </Text>
                    {buttonData.map((dataItem) => (
                        <View key={dataItem.id}>
                            <Text>{dataItem.type}:
                                {dataItem.amount}
                                {dataItem.currency}
                            </Text>
                        </View>
                    ))}
                </View>
            );
        } else {
            return (
                <View style={styles.buttonDataContainer}>
                    <Text style={styles.buttonActionText}>
                        {buttonAction}
                    </Text>
                    <Text>
                        Recipient:
                        {buttonData.recipient}
                    </Text>
                    <Text>
                        Amount:
                        {buttonData.amount}
                        {buttonData.currency}
                    </Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <TouchableOpacity>
                    <Icon name="user-circle"
                        size={30} color="#3498db" />
                </TouchableOpacity>
                <Text style={styles.profileName}>
                    Ada
                </Text>
            </View>

            <View style={styles.banner}>
                <Text style={styles.bannerText}>
                    Total Wallet Balance:
                </Text>
                <Text style={styles.bannerBalance}>
                    {walletBalance} BTC
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={
                        () =>
                            handleButtonPress('send')
                    }
                >
                    <Icon name="send"
                        size={20} color="#3498db" />
                    <Text>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleButtonPress('request')}
                >
                    <Icon name="arrow-up" size={20}
                        color="#3498db" />
                    <Text>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleButtonPress('history')}
                >
                    <Icon name="history" size={20}
                        color="#3498db" />
                    <Text>Transaction history</Text>
                </TouchableOpacity>
            </View>

            {renderButtonData()}

            <ScrollView>
                <View style={styles.cryptoList}>
                    <Text style={styles.sectionTitle}>
                        Cryptocurrencies
                    </Text>
                    <FlatList
                        data={cryptoCurrencies}
                        keyExtractor={
                            (item) =>
                                item.id.toString()
                        }
                        renderItem={renderItem}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 6,
    },
    banner: {
        backgroundColor: '#3498db',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        marginTop: 10,
        alignItems: 'center',
    },
    bannerText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 8,
    },
    bannerBalance: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cryptoList: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cryptoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    cryptoName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    cryptoBalance: {
        fontSize: 14,
        color: '#555',
        marginLeft: 12,
    },
    buttonDataContainer: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    buttonActionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

});

export default CryptoWalletApp;
