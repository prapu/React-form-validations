import * as React from 'react';
import * as ReactDom from 'react-dom';

export class Book extends React.Component<{},IBookState>{
     constructor(props) {
        super(props)

        //declare initial state
        this.state={
            book:{
                name:'',
                description:'',
                category:'',
                price:null,
                publisheddate:null
            },
            hasErrors:false,
            errBook:{
                errname:'',
                errdescription:'',
                errcategory:'',
                errprice:'',
                errpublisheddate:'',
             }
        }
     }
     handleOnChangeInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState=>({
            book:{...prevState.book,[name]: value}}
            ));
      }
    handleOnBlurInput (e) {
        const realName=e.target.name;
        const name = 'err'+realName;
        var errMessage = "";//e.target.value==''?"Error":"";
        switch (realName){
            case 'name':  
                errMessage=ValidateType("Text",e,"Book name");        
                break;
            case 'description':
                errMessage=ValidateType("Text",e,"Book description");
                break;
            case 'category':
                errMessage=e.target.value==''?"Book category cannot be blank.":"";
                break;
            case 'price':
                errMessage=e.target.value==''?"Book price cannot be blank.":"";
                break;
            case 'publisheddate':
                errMessage=e.target.value==''?"Book date published cannot be blank.":"";
                break;
        }
        this.setState(prevState=>({
            errBook:{...prevState.errBook,[name]: errMessage}}
            ));
      }
     render(){        
         return <React.Fragment>
            <h5>Manage Book</h5>
            <form>
            <div className="form-group row mb-1">
                <label className="col-sm-3 col-form-label">Book Name: *</label>
                    <div className="col-sm-9">
                        <input type="text" 
                                id="bookname" 
                                name={'name'}
                                maxLength={20}
                                tabIndex={1}
                                required
                                autoFocus={true}
                                className={this.state.errBook.errname!=''?
                                "form-control is-invalid":
                                "form-control"}
                                placeholder="Book name" 
                                onChange={(e)=>{
                                    this.handleOnChangeInput(e);
                                }}
                                onBlur={(e)=>{
                                    this.handleOnBlurInput(e);               
                                }}
                                value={this.state.book.name}
                                />
                                <DisplayErrors errname={this.state.errBook.errname}/>
                    </div>                  
                </div>
                <div className="form-group row mb-1">
                    <label className="col-sm-3 col-form-label">Description:</label>
                    <div className="col-sm-9">                
                        <input type="text" 
                            id="description"
                            maxLength={500}
                            tabIndex={2}
                            className={this.state.errBook.errdescription!=''?"is-invalid form-control":"form-control"}
                            name={"description"}
                            placeholder="Book description"
                            onChange={(e)=>{
                                this.handleOnChangeInput(e);
                            }}
                            onBlur={(e)=>{
                                this.handleOnBlurInput(e);
                            }}
                            value={this.state.book.description}
                            />
                            <DisplayErrors errname={this.state.errBook.errdescription}/>
                    </div>
                </div>
                <div className="form-group row mb-1">
                    <label className="col-sm-3 col-form-label">Category:</label>
                    <div className="col-sm-9"> 
                        <select id="category" 
                            tabIndex={3}
                            onChange={(e)=>{
                                this.handleOnChangeInput(e);
                            }}
                            onBlur={(e)=>{
                                this.handleOnBlurInput(e);                                
                            }}
                            value={this.state.book.category}
                            name={"category"}
                            className={this.state.errBook.errcategory!=''?
                            "is-invalid form-control":"form-control"}
                            >
                            <option value="">--select--</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Story">Story</option>
                            <option value="Adventure">Adventure</option>
                        </select>
                        <DisplayErrors errname={this.state.errBook.errcategory}/>                        
                    </div>
                </div>
                <div className="form-group row mb-1">
                    <label className="col-sm-3 col-form-label">Price:</label>
                    <div className="col-sm-9">
                        <input type="number" 
                            id="price" 
                            maxLength={18}
                            className={this.state.errBook.errprice!=''?
                            "is-invalid form-control":"form-control"}
                            placeholder="Price" 
                            name={"price"}
                            value={this.state.book.price}
                            onChange={(e)=>{
                                this.handleOnChangeInput(e);
                            }}
                            onBlur={(e)=>{
                                this.handleOnBlurInput(e);                               
                            }}
                            />
                            <DisplayErrors errname={this.state.errBook.errprice}/>                            
                    </div>
                </div>
                <div className="form-group row mb-1">
                    <label className="col-sm-3 col-form-label">Date published:</label>
                    <div className="col-sm-5">
                        <input type="date"
                            id="datepublished"
                            className={this.state.errBook.errpublisheddate?
                                "is-invalid form-control":"form-control"}
                            placeholder="Date published" 
                            name="publisheddate"
                            value={this.state.book.publisheddate}
                            onChange={(e)=>{
                                this.handleOnChangeInput(e);
                            }}
                            onBlur={(e)=>{
                                this.handleOnBlurInput(e);                               
                            }}
                            />
                            <DisplayErrors errname={this.state.errBook.errpublisheddate}/>                             
                    </div> 
                </div>                 
                <div className="text-right">
                    <button type="button"
                        className="btn btn-success mr-2"
                        onClick={(e)=>{
                            console.log(this.state.hasErrors);
                        }}
                    >Submit</button>
                    <button 
                    className="btn btn-danger"
                    type="button">Cancel</button>
                </div>   
            </form>            
            <h5>Book State</h5>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{this.state.book.name}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{this.state.book.description}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{this.state.book.category}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{this.state.book.price}</td>
                </tr>
                <tr>
                    <td>Published Date</td>
                    <td>{this.state.book.publisheddate}</td>
                </tr>
                </tbody>
            </table>
            
         </React.Fragment>
     }
 }
 //State interface
 interface IBookState{
     book:{
         name:string;
         description:string;
         category:string;
         price:number;
         publisheddate:any;
     };
     hasErrors:boolean;
     errBook:{
        errname:string;
        errdescription:string;
        errcategory:string;
        errprice:string;
        errpublisheddate:string;
     }
 }
 const DisplayErrors=(p:{errname:string})=>{
     return <div className={p.errname!==''?
                "invalid-feedback":'d-none'}>
                {p.errname}
            </div>
 }
 const ValidateType=(dataType:string,event:any,fieldName:string)=>{
    var message="";
    switch (dataType){
        case "Text":
            //required field validator
            if(event.target.required){
                message=event.target.value==''? fieldName+" cannot be blank.":"";
            }
            break;
        case "email":
            break;
        case "url":
            break;
        case "number":
            break;
        case "tel":
            break;
        case "date":
            break;
    }
    return message
 }
 export default Book;