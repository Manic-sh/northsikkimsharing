import Offcanvas from 'react-bootstrap/Offcanvas';
import PackageCard from './PackageCard';

function EditingOffCanvas({ show , handleClose, data, editingPackage, selectedDate, handleTableDataUpdate, ...props }) {

    return (
      <>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Update Availability and Rates</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
                <PackageCard editingPackage={editingPackage} data={data} selectedDate={selectedDate} handleTableDataUpdate={handleTableDataUpdate} />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

export default EditingOffCanvas;