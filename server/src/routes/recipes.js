const express = require('express');
const router = express.Router();

module.exports = () => {
  
  router.get('/', (request, response)=>{
    console.log('Recipes accessed');
    response.redirect('https://www.google.com/search?q=recipes&source=hp&ei=6vUUY-KvFd2_0PEPr5ag4AQ&iflsig=AJiK0e8AAAAAYxUD-ltKBBfdLHToTDPjJicymq15RP3k&ved=0ahUKEwjizPyq6fv5AhXdHzQIHS8LCEwQ4dUDCAk&uact=5&oq=recipes&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEIAEELEDMg4ILhCABBCxAxDHARDRAzIFCAAQgAQyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyBQgAEIAEMgsIABCABBCxAxCDATIFCAAQgAQyBQgAEIAEOg4ILhCABBCxAxCDARDUAjoLCC4QsQMQgwEQ1AI6EQguEIAEELEDEIMBEMcBENEDOhEILhCABBCxAxCDARDHARCvAToRCC4QgAQQsQMQxwEQrwEQ1AI6BwgAEIAEEApQAFjtBGDMBWgAcAB4AIABmgGIAZ0FkgEDMy4zmAEAoAEB&sclient=gws-wiz');
  });


  



  return router;
}