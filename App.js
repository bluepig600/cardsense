import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect, useRef } from 'react';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <FontAwesome6 name="house" size={size} color={color} />;
          } else if (route.name === 'My Cards') {
            return <Feather name="credit-card" size={size} color={color} />;
          } else if (route.name === 'Scan Card') {
            return <MaterialCommunityIcons name="credit-card-scan-outline" size={size} color={color} />;
          } 

          // You can return any component that you like here!
          return null;
        },
        tabBarActiveTintColor: '#23844fff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Scan Card" component={ScanCard} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Cards" component={MyCards} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ScanCard() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerEnabled, setScannerEnabled] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      'Barcode Scanned!',
      `Type: ${type}\nData: ${data}`,
      [
        {
          text: 'Scan Again',
          onPress: () => setScanned(false),
        },
        {
          text: 'OK',
          style: 'default',
        },
      ]
    );
  };

  const startScanning = () => {
    setScannerEnabled(true);
    setScanned(false);
  };

  const stopScanning = () => {
    setScannerEnabled(false);
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.scanContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.scanContainer}>
        <Text style={styles.errorText}>No access to camera</Text>
        <Button
          title="Request Permission"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.scanContainer}>
      <Text style={styles.title}>Barcode Scanner</Text>
      
      {!scannerEnabled ? (
        <View style={styles.startContainer}>
          <Button title="Start Scanning" onPress={startScanning} />
        </View>
      ) : (
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.scanner}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417", "aztec", "ean13", "ean8", "upc_e", "upc_a", "code39", "code93", "code128", "codabar", "itf14"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
            <Text style={styles.scanText}>
              {scanned ? 'Tap "Scan Again" to scan another barcode' : 'Point camera at barcode'}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title="Stop Scanning" 
              onPress={stopScanning}
              color="#ff4444"
            />
            {scanned && (
              <Button
                title="Scan Again"
                onPress={() => setScanned(false)}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
function MyCards() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>My Cards</Text>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fff9eff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#333',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  scannerContainer: {
    flex: 1,
  },
  scanner: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#23844fff',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  scanText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
});
