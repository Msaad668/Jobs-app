import React, { Fragment } from "react";

const Profile = () => {
  return (
    <Fragment>
      <div class="user-profile">
        <div class="container p-1">
          <h2 class="py-2">welcome dear user</h2>

          <div class="links py-2">
            <button type="button" class="btn btn-success mr-2">
              add profile
            </button>
            <button type="button" class="btn btn-success mx-2">
              edit profile
            </button>
            <button type="button" class="btn btn-success mx-2">
              add experience
            </button>
            <button type="button" class="btn btn-success mx-2">
              add education
            </button>
          </div>

          <div class="profile-wrapper shadow w-75 my-3">
            <div class="p-4">
              <h2 class="text-center p-2">main information</h2>
              <h3>Title : fullstack developer</h3>
              <hr />
              <h5>
                <strong> bio : </strong> ipsum dolor sit amet consectetur,
                adipisicing elit. Asperiores cupiditate atque pariatur a porro
                quidem inventore, voluptatibus nostrum aliquam recusandae quos
                tempore quae blanditiis. Totam eligendi, ullam magnam numquam
                itaque consectetur illo repellendus explicabo laudantium? Beatae
                recusandae unde quibusdam autem.
              </h5>
              <hr />
              <h4>location : cairo, egypt</h4>
              <hr />
              <h4>current employer : the awesome startup</h4>
            </div>
          </div>

          <div class="profile-wrapper shadow w-75 my-3">
            <div class="p-4">
              <h2 class="text-center p-2">skills</h2>

              <div class="w-75 mx-auto p-1">
                hjksdfdh -dsfvjhdfvh - sdfvhjdkffvh - sdhvfuifvh -sdfvhjdfvh
                -sdfvhiuh -isdjvoijh -dhfvhiuhvi
              </div>
            </div>
          </div>

          <div class="profile-wrapper shadow w-75 my-3">
            <div class="p-4">
              <h2 class="text-center p-2">Education</h2>
              <div>
                <h3>University Of Washington</h3>
                <p>Sep 1993 - June 1999</p>
                <p>
                  <strong>Degree: </strong>Masters
                </p>
                <p>
                  <strong>Field Of Study: </strong>Computer Science
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>
          </div>

          <div class="profile-wrapper shadow w-75 my-3">
            <div class="p-4">
              <h2 class="text-center p-2">Experience</h2>
              <div>
                <h3 class="text-dark">Microsoft</h3>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position: </strong>Senior Developer
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
              <div>
                <h3 class="text-dark">Sun Microsystems</h3>
                <p>Nov 2004 - Nov 2011</p>
                <p>
                  <strong>Position: </strong>Systems Admin
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
