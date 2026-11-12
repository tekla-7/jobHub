export default class APIFeatures {
    constructor(query, queryString,searchFields=[],searchHandler=null) {
        this.query = query;
        this.searchFields = searchFields;
        this.queryString = queryString;
        this.searchHandler = searchHandler;
    }


    async filter() {
        const queryObj = {...this.queryString};
        const excludedFields = ['page', 'sort', 'pageSize', 'fields','search','order'];
        excludedFields.forEach(item => delete queryObj[item]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        );
        const filters=JSON.parse(queryStr);
        if(this.queryString.search&&this.searchFields.length){
            const regex={
                $regex:this.queryString.search,
                $options: 'i'
            }
            const orFilters = this.searchFields.map(field => ({
                [field]: regex
            }));

            if (this.searchHandler) {
                const customFilters = await this.searchHandler(
                    this.queryString.search
                );

                orFilters.push(...customFilters.$or || []);
            }

            if (orFilters.length) {
                filters.$or = orFilters;
            }        }
        this.filterQuery=filters
        this.query = this.query.find(filters);
        return this
    }
    sort(){
        const sortBy=this.queryString.sort||'createdAt';
        const order=this.queryString.order==='asc'?1:-1;
        this.query = this.query.sort({[sortBy]:order});

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