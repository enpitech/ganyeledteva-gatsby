import CMS from 'decap-cms-app';

CMS.init({
  config: {
    media_folder: 'static/assets/pics/uploads', // # Media files will be stored in the repo under static/images/uploads
    public_folder: '/assets/pics/uploads', // # The src attribute for uploaded media will begin with /images/uploads
  },
});
