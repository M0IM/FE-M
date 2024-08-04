import {Typography} from '../../@common/Typography/Typography.tsx';
import PostPreviewBox from '../../home/PostPreviewBox/PostPreviewBox.tsx';

export default function MoimHappeningEvent() {
  return (
    <>
      <Typography className="text-lg" fontWeight={'BOLD'}>
        모임에 무슨일이 일어나고 있나요?
      </Typography>
      <PostPreviewBox />
    </>
  );
}
