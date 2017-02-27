module.exports = function(id) {
  return {
    TableName: id,
    AttributeDefinitions: [
        {AttributeName: 'id', AttributeType: 'S'}
    ],
    KeySchema: [
        {AttributeName: 'id', KeyType: 'HASH'}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 50
    }
  };
}
