export default class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'pageSize', 'fields',    'search'];
        excludedFields.forEach(item => delete queryObj[item]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        );
        const filters=JSON.parse(queryStr);
        if(this.queryString.search){
            filters.name = {
                $regex:this.queryString.search,
                $options: 'i'
            }
        }
        this.filterQuery=filters
        this.query = this.query.find(filters);
        return this
    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    paginate(){
        const page=Number(this.queryString.page)||1;
        const limit=Number(this.queryString.pageSize)||10;
        const skip=(page-1)*limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;

    }
}