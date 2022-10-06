import React from "react";

const UserInfo = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username3" color="green" value="Your name" />
          </div>
          <TextInput
            id="username"
            placeholder="Bonnie Green"
            required={true}
            color="green"
            helperText={
              <React.Fragment>
                <span className="font-medium">Alright!</span> Username
                available!
              </React.Fragment>
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username4" color="red" value="Your name" />
          </div>
          <TextInput
            id="username4"
            placeholder="Bonnie Green"
            required={true}
            color="red"
            helperText={
              <React.Fragment>
                <span className="font-medium">Oops!</span> Username already
                taken!
              </React.Fragment>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
