const moment = require('moment');
const { connections } = require('mongoose');


const notifications = [
    {
        "Market":"Denmark",
        "Companytype":"All",
        "notifications":5,
       "Days":[1, 5, 10, 15, 20]    
    },
    {
        "Market":"Norway",
        "Companytype":"All",
        "notifications":4,
       "Days":[1, 5, 10, 20]    
    },
    {
        "Market":"Sweden",
        "Companytype":" small and medium ",
        "notifications":4,
       "Days":[ 1, 7, 14, 28]    
    },
    {
        "Market":"Finland",
        "Companytype":"large",
        "notifications":5,
       "Days":[ 1, 5, 10, 15, 20]    
    },

]


const getAddedDateWithFormat = (adddays) => {
    let addeddate ;
    if(adddays<=7){
        let oldDate =  new Date();
        addeddate =new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+adddays);
    }else{
         addeddate = moment().add(adddays, 'days').calendar();
    }

  return moment(new Date(addeddate)).format('DD/MM/YYYY');
   
}


const getDates = (market) => {
    console.log("getDates triggered --- ", market)
    const getDetailsForNotification = notifications.filter(el => el.Market === market);
    const {Days} = getDetailsForNotification[0]
    return   Days.map(getAddedDateWithFormat)
}


module.exports = {
    getDates
}