<div class="card">
    <div class="card-header">
        <h4 class="font-weight-bold">Edit Location</h4>
    </div>
    <div class="card-body">
        <form action="/updateLocation/<%= location._id %>" method="post">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="name">First Name</label>
                        <input type="text" class="form-control" value="<%= location.name %>" name="name" placeholder="enter location name" id="name">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="country">Last Name</label>
                        <input type="text" class="form-control" value="<%= location.country %>" name="country" placeholder="enter country name" id="country">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="phonenumber">Phone Number</label>
                        <input type="number" class="form-control" value="<%= location.phonenumber %>" name="phonenumber" placeholder="enter your phone number" id="phonenumber">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label class="col-form-label" for="cnic">CNIC</label>
                        <input type="text" class="form-control" value="<%= location.cnic %>" name="cnic" placeholder="22222-2222222-2" id="cnic">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="addres">Address</label>
                        <textarea class="form-control" name="address" id="address" rows="3">
                        <%= location.address %>
                        </textarea>
                    </div>
                </div>
            </div>
            <div class="">
                <button type="submit" class="btn btn-success">Update</button>
                <a href="/" class="btn btn-light">Cancel</a>
            </div>
        </form>
    </div>
</div>