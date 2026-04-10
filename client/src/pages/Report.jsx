import Layout from '../components/Common/Layout';
import ReportForm from '../components/Report/ReportForm';
import MapView from '../components/Map/MapView';

function Report() {
  return (
    <Layout>
      <ReportForm />
      <MapView />
    </Layout>
  );
}

export default Report;