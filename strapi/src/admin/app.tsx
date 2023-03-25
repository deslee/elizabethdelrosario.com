import CustomEditor from './extensions/components/CustomEditor';

export default {
  bootstrap(app) {
    app.addFields({ type: 'wysiwyg', Component: CustomEditor });
  },
};
