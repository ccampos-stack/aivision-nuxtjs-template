import mock from './mockAdapter';

import  './projects/ProjectsData';
import  './blogs/blogsData';

mock.onAny().passThrough();
