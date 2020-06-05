package co.fuziontek.repository;

import co.fuziontek.domain.GearDiagQuestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDiagQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDiagQuestionRepository extends JpaRepository<GearDiagQuestion, Long> {

}
