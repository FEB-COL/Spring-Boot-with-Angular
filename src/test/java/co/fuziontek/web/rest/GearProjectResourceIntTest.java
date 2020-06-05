package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearProject;
import co.fuziontek.repository.GearProjectRepository;
import co.fuziontek.service.GearProjectService;
import co.fuziontek.service.dto.GearProjectDTO;
import co.fuziontek.service.mapper.GearProjectMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearProjectResource REST controller.
 *
 * @see GearProjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearProjectResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_BUDGET = 1D;
    private static final Double UPDATED_BUDGET = 2D;

    private static final Integer DEFAULT_PERCENTAGE_COMPLETED = 1;
    private static final Integer UPDATED_PERCENTAGE_COMPLETED = 2;

    private static final Double DEFAULT_SPEND = 1D;
    private static final Double UPDATED_SPEND = 2D;

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ATTACH = "AAAAAAAAAA";
    private static final String UPDATED_ATTACH = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_MODIFIED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_MODIFIED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GearProjectRepository gearProjectRepository;

    @Mock
    private GearProjectRepository gearProjectRepositoryMock;

    @Autowired
    private GearProjectMapper gearProjectMapper;

    @Mock
    private GearProjectService gearProjectServiceMock;

    @Autowired
    private GearProjectService gearProjectService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearProjectMockMvc;

    private GearProject gearProject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearProjectResource gearProjectResource = new GearProjectResource(gearProjectService);
        this.restGearProjectMockMvc = MockMvcBuilders.standaloneSetup(gearProjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearProject createEntity(EntityManager em) {
        GearProject gearProject = new GearProject()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .budget(DEFAULT_BUDGET)
            .percentageCompleted(DEFAULT_PERCENTAGE_COMPLETED)
            .spend(DEFAULT_SPEND)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .attach(DEFAULT_ATTACH)
            .createdBy(DEFAULT_CREATED_BY)
            .creationDate(DEFAULT_CREATION_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return gearProject;
    }

    @Before
    public void initTest() {
        gearProject = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearProject() throws Exception {
        int databaseSizeBeforeCreate = gearProjectRepository.findAll().size();

        // Create the GearProject
        GearProjectDTO gearProjectDTO = gearProjectMapper.toDto(gearProject);
        restGearProjectMockMvc.perform(post("/api/gear-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectDTO)))
            .andExpect(status().isCreated());

        // Validate the GearProject in the database
        List<GearProject> gearProjectList = gearProjectRepository.findAll();
        assertThat(gearProjectList).hasSize(databaseSizeBeforeCreate + 1);
        GearProject testGearProject = gearProjectList.get(gearProjectList.size() - 1);
        assertThat(testGearProject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearProject.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGearProject.getBudget()).isEqualTo(DEFAULT_BUDGET);
        assertThat(testGearProject.getPercentageCompleted()).isEqualTo(DEFAULT_PERCENTAGE_COMPLETED);
        assertThat(testGearProject.getSpend()).isEqualTo(DEFAULT_SPEND);
        assertThat(testGearProject.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testGearProject.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testGearProject.getAttach()).isEqualTo(DEFAULT_ATTACH);
        assertThat(testGearProject.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testGearProject.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testGearProject.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testGearProject.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createGearProjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearProjectRepository.findAll().size();

        // Create the GearProject with an existing ID
        gearProject.setId(1L);
        GearProjectDTO gearProjectDTO = gearProjectMapper.toDto(gearProject);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearProjectMockMvc.perform(post("/api/gear-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProject in the database
        List<GearProject> gearProjectList = gearProjectRepository.findAll();
        assertThat(gearProjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearProjects() throws Exception {
        // Initialize the database
        gearProjectRepository.saveAndFlush(gearProject);

        // Get all the gearProjectList
        restGearProjectMockMvc.perform(get("/api/gear-projects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearProject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].budget").value(hasItem(DEFAULT_BUDGET.doubleValue())))
            .andExpect(jsonPath("$.[*].percentageCompleted").value(hasItem(DEFAULT_PERCENTAGE_COMPLETED)))
            .andExpect(jsonPath("$.[*].spend").value(hasItem(DEFAULT_SPEND.doubleValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].attach").value(hasItem(DEFAULT_ATTACH.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllGearProjectsWithEagerRelationshipsIsEnabled() throws Exception {
        GearProjectResource gearProjectResource = new GearProjectResource(gearProjectServiceMock);
        when(gearProjectServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restGearProjectMockMvc = MockMvcBuilders.standaloneSetup(gearProjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGearProjectMockMvc.perform(get("/api/gear-projects?eagerload=true"))
        .andExpect(status().isOk());

        verify(gearProjectServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllGearProjectsWithEagerRelationshipsIsNotEnabled() throws Exception {
        GearProjectResource gearProjectResource = new GearProjectResource(gearProjectServiceMock);
            when(gearProjectServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restGearProjectMockMvc = MockMvcBuilders.standaloneSetup(gearProjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restGearProjectMockMvc.perform(get("/api/gear-projects?eagerload=true"))
        .andExpect(status().isOk());

            verify(gearProjectServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getGearProject() throws Exception {
        // Initialize the database
        gearProjectRepository.saveAndFlush(gearProject);

        // Get the gearProject
        restGearProjectMockMvc.perform(get("/api/gear-projects/{id}", gearProject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearProject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.budget").value(DEFAULT_BUDGET.doubleValue()))
            .andExpect(jsonPath("$.percentageCompleted").value(DEFAULT_PERCENTAGE_COMPLETED))
            .andExpect(jsonPath("$.spend").value(DEFAULT_SPEND.doubleValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.attach").value(DEFAULT_ATTACH.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearProject() throws Exception {
        // Get the gearProject
        restGearProjectMockMvc.perform(get("/api/gear-projects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearProject() throws Exception {
        // Initialize the database
        gearProjectRepository.saveAndFlush(gearProject);

        int databaseSizeBeforeUpdate = gearProjectRepository.findAll().size();

        // Update the gearProject
        GearProject updatedGearProject = gearProjectRepository.findById(gearProject.getId()).get();
        // Disconnect from session so that the updates on updatedGearProject are not directly saved in db
        em.detach(updatedGearProject);
        updatedGearProject
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .budget(UPDATED_BUDGET)
            .percentageCompleted(UPDATED_PERCENTAGE_COMPLETED)
            .spend(UPDATED_SPEND)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .attach(UPDATED_ATTACH)
            .createdBy(UPDATED_CREATED_BY)
            .creationDate(UPDATED_CREATION_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        GearProjectDTO gearProjectDTO = gearProjectMapper.toDto(updatedGearProject);

        restGearProjectMockMvc.perform(put("/api/gear-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectDTO)))
            .andExpect(status().isOk());

        // Validate the GearProject in the database
        List<GearProject> gearProjectList = gearProjectRepository.findAll();
        assertThat(gearProjectList).hasSize(databaseSizeBeforeUpdate);
        GearProject testGearProject = gearProjectList.get(gearProjectList.size() - 1);
        assertThat(testGearProject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearProject.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGearProject.getBudget()).isEqualTo(UPDATED_BUDGET);
        assertThat(testGearProject.getPercentageCompleted()).isEqualTo(UPDATED_PERCENTAGE_COMPLETED);
        assertThat(testGearProject.getSpend()).isEqualTo(UPDATED_SPEND);
        assertThat(testGearProject.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testGearProject.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testGearProject.getAttach()).isEqualTo(UPDATED_ATTACH);
        assertThat(testGearProject.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testGearProject.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testGearProject.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testGearProject.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGearProject() throws Exception {
        int databaseSizeBeforeUpdate = gearProjectRepository.findAll().size();

        // Create the GearProject
        GearProjectDTO gearProjectDTO = gearProjectMapper.toDto(gearProject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearProjectMockMvc.perform(put("/api/gear-projects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearProjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearProject in the database
        List<GearProject> gearProjectList = gearProjectRepository.findAll();
        assertThat(gearProjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearProject() throws Exception {
        // Initialize the database
        gearProjectRepository.saveAndFlush(gearProject);

        int databaseSizeBeforeDelete = gearProjectRepository.findAll().size();

        // Get the gearProject
        restGearProjectMockMvc.perform(delete("/api/gear-projects/{id}", gearProject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearProject> gearProjectList = gearProjectRepository.findAll();
        assertThat(gearProjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProject.class);
        GearProject gearProject1 = new GearProject();
        gearProject1.setId(1L);
        GearProject gearProject2 = new GearProject();
        gearProject2.setId(gearProject1.getId());
        assertThat(gearProject1).isEqualTo(gearProject2);
        gearProject2.setId(2L);
        assertThat(gearProject1).isNotEqualTo(gearProject2);
        gearProject1.setId(null);
        assertThat(gearProject1).isNotEqualTo(gearProject2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearProjectDTO.class);
        GearProjectDTO gearProjectDTO1 = new GearProjectDTO();
        gearProjectDTO1.setId(1L);
        GearProjectDTO gearProjectDTO2 = new GearProjectDTO();
        assertThat(gearProjectDTO1).isNotEqualTo(gearProjectDTO2);
        gearProjectDTO2.setId(gearProjectDTO1.getId());
        assertThat(gearProjectDTO1).isEqualTo(gearProjectDTO2);
        gearProjectDTO2.setId(2L);
        assertThat(gearProjectDTO1).isNotEqualTo(gearProjectDTO2);
        gearProjectDTO1.setId(null);
        assertThat(gearProjectDTO1).isNotEqualTo(gearProjectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearProjectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearProjectMapper.fromId(null)).isNull();
    }
}
