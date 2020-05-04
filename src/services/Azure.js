import axios from 'axios';

export default class Azure {
  api = process.env.REACT_APP_AZURE_API;

  getMembers = async () => {
    try {
      return await (await axios.get(`${this.api}/profiles`)).data;
    } catch (error) {
      console.error("Can't load members", error.message);
    }
  };
}
