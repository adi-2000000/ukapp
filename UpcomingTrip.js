
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const UpcomingTrip = ({ employeeId }) => {
    const [trips, setTrips] = useState([]);
    const [additionalDetails, setAdditionalDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAdditionalDetails, setLoadingAdditionalDetails] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('http://192.168.1.3/UK_UserLogin/userdashboard-api.php?employee_id=${employeeId}');
                if (response.ok) {
                    const data = await response.json();
                    setTrips(data);
                } else {
                    console.error('Error fetching trips:', response.status);
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [employeeId]);

    useEffect(() => {
        const fetchAdditionalDetails = async () => {
            try {
                const response = await fetch('http://192.168.1.2/UK_UserLogin/userdashboard-api.php?employee_id=${employeeId}');
                if (response.ok) {
                    const data = await response.json();
                    setAdditionalDetails(data);
                } else {
                    console.error('Error fetching additional details:', response.status);
                }
            } catch (error) {
                console.error('Error fetching additional details:', error);
            } finally {
                setLoadingAdditionalDetails(false);
            }
        };

        fetchAdditionalDetails();
    }, [employeeId]);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.sectionTitle}>Upcoming Trips Table</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
                ) : (
                    <View style={styles.tableContainer}>
                        <ScrollView horizontal>
                            <View style={styles.table}>
                                <View style={[styles.row, styles.header]}>
                                    <Text style={[styles.cellLabel, styles.borderRight]}>Employee ID</Text>
                                    <Text style={[styles.cellLabel, styles.borderRight]}>Driver Name</Text>
                                    <Text style={[styles.cellLabel, styles.borderRight]}>Cab No</Text>
                                    <Text style={[styles.cellLabel, styles.borderRight]}>Pickup Timings</Text>
                                    <Text style={[styles.cellLabel, styles.borderRight]}>Pickup Date</Text>
                                    <Text style={styles.cellLabel}>In Timing</Text>
                                </View>
                                {trips.map((trip, index) => (
                                    <View key={index} style={[styles.row, styles.borderTop]}>
                                        <Text style={[styles.cellValue, styles.borderRight]}>{trip.employee_id}</Text>
                                        <Text style={[styles.cellValue, styles.borderRight]}>{trip.driver_name}</Text>
                                        <Text style={[styles.cellValue, styles.borderRight]}>{trip.cab_no}</Text>
                                        <Text style={[styles.cellValue, styles.borderRight]}>{trip.pickup_timings}</Text>
                                        <Text style={[styles.cellValue, styles.borderRight]}>{trip.pickup_date}</Text>
                                        <Text style={styles.cellValue}>{trip.in_timing}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>

           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
      
        borderColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 50, 
        borderColor: '#ccc',
    },
    loadingIndicator: {
        marginTop: 10, 
        borderColor: '#ccc',
    },
    tableContainer: {
        maxHeight: 200, // Set maximum height for the tables
        borderWidth: 1,
        borderColor: '#ccc',
    },
    table: {
        borderWidth: 0,
        borderColor: '#ccc',
    },
    row: {
        flexDirection: 'row',
      
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    header: {
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        textAlign: 'center',
    },
    cellLabel: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginHorizontal: 20,
        fontSize:20,
       
    },
    cellValue: {
        flex: 1,
        textAlign: 'center',
      
        textAlign: 'center',
        color: 'black',
        marginHorizontal: 20,
        fontSize:20,
      
       
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
         borderRightWidth: 0,
     
        borderColor: 'black', // Set border color for rows
    },
    borderRight: {
        borderRightWidth: 0,
    },
    borderTop: {
        borderTopWidth: 3,
    },
});
export default UpcomingTrip;
