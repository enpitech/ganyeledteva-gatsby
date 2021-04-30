import CMS from 'netlify-cms-app';

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      repo: 'nir2002/ganyeledteva-gatsby', // Path to your Github repository
      branch: 'main', // Branch to update
      // base_url: https://auth-cms.herokuapp.com
      media_folder: '/public/pics/uploads', // Media files will be stored in the repo under public/images/uploads
      public_folder: '/pics/uploads', // The src attribute for uploaded media will begin with /pics/uploads
      publish_mode: 'editorial_workflow',
    },
    collections: [
      {
        name: 'weekly-update',
        label: 'עדכון שבועי',
        folder: 'content/pages/content/weekly-update',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת', name: 'title', widget: 'string' },
          { label: 'תאריך', name: 'date', widget: 'datetime', required: false },
          {
            label: 'תת כותרת',
            name: 'subtitle',
            widget: 'text',
            required: false,
          },
          { label: 'תמונה', name: 'img', widget: 'image', required: false },
          { label: 'טקסט', name: 'body', widget: 'markdown', required: false },
        ],
      },
      {
        name: 'home',
        label: 'דף הבית',
        folder: 'content/static',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת דף', name: 'title', widget: 'string' },
          {
            label: 'כותרת לכתבה הראשונה',
            name: 'story1_title',
            widget: 'string',
          },
          { label: 'תת כותרת', name: 'story1_subtitle', widget: 'text' },
          { label: 'טקסט בכפתור', name: 'story1_link', widget: 'string' },
          { label: 'כתובת לינק', name: 'story1_url', widget: 'string' },
          { label: 'תמונה', name: 'story1_img', widget: 'image' },

          {
            label: 'כותרת לכתבה הראשונה',
            name: 'story2_title',
            widget: 'string',
          },
          { label: 'תת כותרת', name: 'story2_subtitle', widget: 'text' },
          { label: 'טקסט בכפתור', name: 'story2_link', widget: 'string' },
          { label: 'כתובת לינק', name: 'story2_url', widget: 'string' },
          { label: 'תמונה', name: 'story2_img', widget: 'image' },

          {
            label: 'כותרת לכתבה הראשונה',
            name: 'story3_title',
            widget: 'string',
          },
          { label: 'תת כותרת', name: 'story3_subtitle', widget: 'text' },
          { label: 'טקסט בכפתור', name: 'story3_link', widget: 'string' },
          { label: 'כתובת לינק', name: 'story3_url', widget: 'string' },
          { label: 'תמונה', name: 'story3_img', widget: 'image' },
        ],
      },

      {
        name: 'team',
        label: 'הצוות',
        folder: 'content/team',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'שם פנימי', name: 'title', widget: 'string' },
          { label: 'שם', name: 'firstname', widget: 'string' },
          { label: 'שם משפחה', name: 'lastname', widget: 'string' },
          { label: 'תמונה', name: 'img', widget: 'image' },
          { label: 'מיקום', name: 'index', widget: 'number' },
          { label: 'טקסט', name: 'body', widget: 'markdown' },
        ],
      },

      {
        name: 'democraticeducation',
        label: 'הגישה הדמוקרטית',
        folder: 'content/pages/content/democraticeducation',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת', name: 'title', widget: 'string' },
          { label: 'תת כותרת', name: 'subtitle', widget: 'text' },
          {
            label: 'תת כותרת 2 - לא חובה',
            name: 'subtitle 2',
            widget: 'text',
            required: false,
          },
          {
            label: 'תמונת רקע - לא חובה',
            name: 'bg',
            widget: 'image',
            required: false,
          },
          {
            label: 'תמונה ראשית - לא חובה',
            name: 'img',
            widget: 'image',
            required: false,
          },
          { label: 'מיקום', name: 'index', widget: 'number' },
          {
            name: 'images',
            label: 'תמונות',
            widget: 'list',
            fields: [
              { label: 'תמונה', name: 'src', widget: 'image' },
              { label: 'כיתוב תמונה', name: 'alt', widget: 'string' },
              { label: 'טקסט', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },

      {
        name: 'gan',
        label: 'הגן',
        folder: 'content/pages/content/gan',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת', name: 'title', widget: 'string' },
          { label: 'תת כותרת', name: 'subtitle', widget: 'text' },
          { label: 'כפתור', name: 'link', widget: 'string' },
          {
            label: 'תת כותרת 2 - לא חובה',
            name: 'subtitle 2',
            widget: 'text',
            required: false,
          },
          {
            label: 'תמונת רקע - לא חובה',
            name: 'bg',
            widget: 'image',
            required: false,
          },
          {
            label: 'תמונה ראשית - לא חובה',
            name: 'img',
            widget: 'image',
            required: false,
          },
          { label: 'מיקום', name: 'index', widget: 'number' },
          {
            name: 'images',
            label: 'תמונות',
            widget: 'list',
            fields: [
              { label: 'תמונה', name: 'src', widget: 'image' },
              { label: 'כיתוב תמונה', name: 'alt', widget: 'string' },
              { label: 'טקסט', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },

      {
        name: 'democratic-center',
        label: 'המרכז הדמוקרטי',
        folder: 'content/pages/content/democratic-center',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת', name: 'title', widget: 'string' },
          { label: 'תת כותרת', name: 'subtitle', widget: 'text' },
          {
            label: 'תת כותרת 2 - לא חובה',
            name: 'subtitle 2',
            widget: 'text',
            required: false,
          },
          {
            label: 'תמונת רקע - לא חובה',
            name: 'bg',
            widget: 'image',
            required: false,
          },
          {
            label: 'תמונה ראשית - לא חובה',
            name: 'img',
            widget: 'image',
            required: false,
          },
          { label: 'מיקום', name: 'index', widget: 'number' },
          {
            name: 'images',
            label: 'תמונות',
            widget: 'list',
            fields: [
              { label: 'תמונה', name: 'src', widget: 'image' },
              { label: 'כיתוב תמונה', name: 'alt', widget: 'string' },
              { label: 'טקסט', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },

      {
        name: 'signup',
        label: 'רישום לגן',
        folder: 'content/pages/content/signup',
        create: true,
        slug: '{{slug}}',
        fields: [
          { label: 'כותרת', name: 'title', widget: 'string' },
          { label: 'תת כותרת', name: 'subtitle', widget: 'text' },
          { label: 'טקסט', name: 'body', widget: 'markdown' },
        ],
      },
    ],
  },
});
