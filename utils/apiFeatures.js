
// API FEATURE FOR ALL SORTING AND SARCHING
class APIFeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;

    }
    filter(){
        const queryObj={...this.queryString};
        const excludeFiled=['page','sort','limit','fields'];
        excludeFiled.forEach(ele=>delete queryObj[ele]);

        // // Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|te|lte|lt)\b/g, (match) => `$${match}`);
        this.query= this.query.find(JSON.parse(queryStr));
        // for returning the entire object
        return this;

        // console.log(JSON.parse(queryStr));


    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            // sort first variable
            this.query=this.query.sort(sortBy)
        }
        else{
            // for removing v
            this.query=this.query.select('-__v');
        }
        return this;

    }

    limitfilds(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields);

        }
        else{
            // for removing v
            this.query=this.query.select('-__v');
        }
        return this;


    }
    pagginate(){
        const page=this.queryString.page*1||1;  
        const limit =this.queryString.limit*1||100;
        const skip=(page-1)*limit;  
        this.query=this.query.skip(skip).limit(limit);
        // Return number of document
        // if (this.query.page){
        //     const numTour=await Tour.countDocuments();
        //     if(skip>=numTour) throw new Error('This page does not exist');

        return this;
    }    
}

module.exports=APIFeatures;