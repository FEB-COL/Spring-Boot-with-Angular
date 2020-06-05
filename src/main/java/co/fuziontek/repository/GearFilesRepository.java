package co.fuziontek.repository;

import co.fuziontek.domain.GearFiles;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearFiles entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearFilesRepository extends JpaRepository<GearFiles, Long> {

}
