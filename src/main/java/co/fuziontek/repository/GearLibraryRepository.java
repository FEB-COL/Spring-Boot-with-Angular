package co.fuziontek.repository;

import co.fuziontek.domain.GearLibrary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearLibrary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearLibraryRepository extends JpaRepository<GearLibrary, Long> {

}
