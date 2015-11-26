module.exports = {
	identity: 'buffer',
	connection: 'mysqlDB',
	schema:true,
	migrate: 'alter',
	attributes: {
		user_id: 'integer',
		longitude: 'float',
		latitude: 'float',
		marker_index: 'integer',
		marker_data: 'string',
		marker_description: 'string',
		marker_longitude: 'float',
		marker_latitude: 'float',
		timestamp_android: 'string',
		timestamp_kinect : 'string',
		points : 'array',
		array: 'array'
	}
};
