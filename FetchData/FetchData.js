module.exports.ApiFetch = async () => {
    var response = await fetch('https://intent-kit-16.hasura.app/api/rest/blogs/',{
            method:'get',
            headers:{
                'x-hasura-admin-secret':'32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        let data = await response.json();
        return data;
}